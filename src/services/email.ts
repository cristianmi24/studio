/**
 * Represents the structure of an email message.
 */
export interface Email {
  /**
   * The sender's name.
   */
  name: string;
  /**
   * The sender's email address.
   */
  email: string;
  /**
   * The email message content.
   */
  message: string;
}

/**
 * Asynchronously sends an email message.
 *
 * @param email The email to send, including sender information and message content.
 * @returns A promise that resolves when the email is successfully sent.
 */
export async function sendEmail(email: Email): Promise<void> {
  // TODO: Implement this by calling an API.
  console.log("Sent email", email);
}
