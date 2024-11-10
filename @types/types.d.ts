import { DefaultSession } from "next-auth"; // Assuming you're using next-auth for session management

declare module "next-auth" {
  interface Session {
    adminId?: string; // You can also define other properties as needed
  }
}