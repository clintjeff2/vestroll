import { db } from "../db";
import { timesheets, users } from "../db/schema";
import { eq, and } from "drizzle-orm";
import {
  ForbiddenError,
  NotFoundError,
  BadRequestError,
} from "../utils/errors";
import { UpdateTimesheetStatusInput } from "../validations/timesheet.schema";

export class TimesheetService {
  static async updateStatus(
    userId: string,
    timesheetId: string,
    input: UpdateTimesheetStatusInput,
  ) {
    const [user] = await db
      .select({ organizationId: users.organizationId })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user?.organizationId) {
      throw new ForbiddenError("User is not associated with any organization");
    }

    const [timesheet] = await db
      .select()
      .from(timesheets)
      .where(
        and(
          eq(timesheets.id, timesheetId),
          eq(timesheets.organizationId, user.organizationId),
        ),
      )
      .limit(1);

    if (!timesheet) {
      throw new NotFoundError("Timesheet not found");
    }

    if (timesheet.status !== "pending") {
      throw new BadRequestError(
        `Timesheet has already been ${timesheet.status}`,
      );
    }

    if (timesheet.lockedForPayroll) {
      throw new BadRequestError("Timesheet is locked for payroll processing");
    }

    const now = new Date();
    const totalApprovedAmount =
      input.status === "approved"
        ? timesheet.rate * timesheet.totalWorked
        : null;

    const [updated] = await db
      .update(timesheets)
      .set({
        status: input.status,
        totalApprovedAmount,
        lockedForPayroll: input.status === "approved",
        approvedBy: userId,
        approvedAt: now,
        updatedAt: now,
      })
      .where(eq(timesheets.id, timesheetId))
      .returning({
        id: timesheets.id,
        status: timesheets.status,
        totalApprovedAmount: timesheets.totalApprovedAmount,
      });

    return updated;
  }
}
