import { User } from "../models/user.Model.js";
import connectDB from "./db.js";

const migrateUsers = async () => {
    try {
        await connectDB();
        
        // Find all users without isVerified field and set it to true
        const result = await User.updateMany(
            { isVerified: { $exists: false } },
            { $set: { isVerified: true } }
        );
        
        console.log(`Updated ${result.modifiedCount} users with isVerified field`);
        
        // Also check for users with isVerified: false and update them
        const unverifiedResult = await User.updateMany(
            { isVerified: false },
            { $set: { isVerified: true } }
        );
        
        console.log(`Updated ${unverifiedResult.modifiedCount} unverified users to verified`);
        
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateUsers();