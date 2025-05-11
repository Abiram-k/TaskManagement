import cron from "node-cron";
import { UserRepository } from "../repository/user.repository";
const userRepository = new UserRepository();
cron.schedule("0 0 * * *", async () => {
    try {
        const users = await userRepository.findUserHavingOverDue();
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        for (const user of users) {
            let updated = false;
            for (const task of user.tasks) {
                if (task.dueDate < todayStart && task.status === "pending") {
                    task.status = "overdue";
                    updated = true;
                }
            }
            if (updated) {
                await user.save();
                console.log(`Updated overdue tasks for user: ${user.email}`);
            }
        }
        console.log("Overdue task check completed.");
    }
    catch (err) {
        console.error("Error updating overdue tasks:", err);
    }
});
