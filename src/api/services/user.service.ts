// This will contain business logic for User operations

export class UserService {
  static async getUserProfile(userId: string) {
    return {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
    };
  }
}
