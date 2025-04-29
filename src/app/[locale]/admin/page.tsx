
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Lock, Unlock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ContactMessage } from '@/components/sections/contact-section'; // Import interface
import { format } from 'date-fns'; // For timestamp formatting
import { es, enUS } from 'date-fns/locale'; // Import locales for date formatting
import { useTranslations, useLocale } from 'next-intl';
import { Input } from '@/components/ui/input'; // Import Input for password

// --- VERY INSECURE - For demonstration only ---
const ADMIN_PASSWORD = "cristian2404"; // Updated password as requested
// --------------------------------------------

export default function AdminPage() {
    const t = useTranslations('AdminPage');
    const currentLocale = useLocale();
    const { toast } = useToast();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordAttempt, setPasswordAttempt] = useState('');
    const [isLoading, setIsLoading] = useState(true); // To handle initial localStorage access

    // Load messages from localStorage on mount (only if authenticated)
    useEffect(() => {
        if (isAuthenticated) {
            try {
                const storedMessages = localStorage.getItem('contactMessages');
                if (storedMessages) {
                    setMessages(JSON.parse(storedMessages));
                }
            } catch (error) {
                console.error("Error loading messages from localStorage:", error);
                toast({
                    title: t('toast_load_error_title'),
                    description: t('toast_load_error_desc'),
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        } else {
             // If not authenticated, ensure loading state reflects this until attempted
             setIsLoading(false);
        }
    }, [isAuthenticated, toast, t]); // Re-run if authentication status changes

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordAttempt === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setPasswordAttempt(''); // Clear password field
            toast({ title: t('auth_success_title') });
        } else {
            toast({
                title: t('auth_error_title'),
                description: t('auth_error_desc'),
                variant: "destructive",
            });
            setPasswordAttempt(''); // Clear password field
        }
    };

    const handleClearMessages = () => {
        if (window.confirm(t('clear_confirm'))) {
            try {
                localStorage.removeItem('contactMessages');
                setMessages([]); // Clear state
                toast({
                    title: t('clear_success_title'),
                    description: t('clear_success_desc'),
                });
            } catch (error) {
                console.error("Error clearing messages from localStorage:", error);
                toast({
                    title: t('clear_error_title'),
                    description: t('clear_error_desc'),
                    variant: "destructive",
                });
            }
        }
    };

    const getDateLocale = () => {
       return currentLocale === 'es' ? es : enUS;
    }

    if (!isAuthenticated) {
        return (
            <div className="container py-12 md:py-20 flex justify-center items-center min-h-[calc(100vh-10rem)]">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="flex items-center justify-center gap-2">
                           <Lock className="w-6 h-6" /> {t('auth_title')}
                        </CardTitle>
                        <CardDescription>{t('auth_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                             <Input
                                type="password"
                                value={passwordAttempt}
                                onChange={(e) => setPasswordAttempt(e.target.value)}
                                placeholder={t('auth_placeholder')}
                                required
                                aria-label={t('auth_placeholder')}
                             />
                             <Button type="submit" className="w-full">
                                <Unlock className="mr-2 h-4 w-4" />
                                {t('auth_button')}
                             </Button>
                        </form>
                         <p className="mt-4 text-xs text-center text-destructive">{t('auth_warning')}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Display loading state while fetching from localStorage initially
    if (isLoading && isAuthenticated) {
       return (
           <div className="container py-12 md:py-20 text-center">
                <p>{t('loading_messages')}</p>
                {/* Optional: Add a spinner */}
            </div>
        );
    }

    return (
        <div className="container py-12 md:py-20">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold">{t('page_title')}</h1>
                {messages.length > 0 && (
                     <Button variant="destructive" onClick={handleClearMessages}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t('clear_button')}
                    </Button>
                )}
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>{t('table_title')}</CardTitle>
                     <CardDescription>
                        {messages.length > 0 ? t('table_desc_has_messages', { count: messages.length }) : t('table_desc_no_messages')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {messages.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('col_timestamp')}</TableHead>
                                        <TableHead>{t('col_name')}</TableHead>
                                        <TableHead>{t('col_email')}</TableHead>
                                        <TableHead className="min-w-[250px]">{t('col_message')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Display messages in reverse chronological order */}
                                    {[...messages].reverse().map((msg) => (
                                        <TableRow key={msg.id}>
                                            <TableCell className="whitespace-nowrap">
                                                {format(new Date(msg.timestamp), 'Pp', { locale: getDateLocale() })}
                                            </TableCell>
                                            <TableCell>{msg.name}</TableCell>
                                            <TableCell>{msg.email}</TableCell>
                                            <TableCell className="whitespace-pre-wrap">{msg.message}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                         </div>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">{t('no_messages_text')}</p>
                    )}
                </CardContent>
            </Card>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                {t('local_storage_note')}
             </p>
        </div>
    );
}
