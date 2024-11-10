import { getServerSession } from "next-auth"; // Assuming you are using next-auth for session management

export const getSession = async () => {
  const session = await getServerSession();
  return session; // Return the session object
};