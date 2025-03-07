import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import connectToDB from "../../lib/dbConnect";
import User from "../../models/User";

export const { handlers: { GET, POST } } = NextAuth({
    providers: [
        Google({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

    secret: process.env.AUTH_SECRET,

    callbacks: {
        async signIn({ user }) {
            try {
                await connectToDB();

                const userExist = await User.findOne({ email: user.email });

                if (userExist) {
                    await User.findByIdAndUpdate(userExist?._id, user);
                } else {
                    const newUser = new User(user);
                    await newUser.save();
                }

            } catch (error) {
                console.log("Error in saving user from Google:", error);
            }
            return true;
        },

        async jwt({ token, account, profile }) {
            if (account && profile) {
                const user = await User.findOne({ email: profile?.email });
                token.userId = user?._id;
            }
            return token
        },
    },

})