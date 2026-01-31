import { prisma } from "../lib/prisma";
import { Role } from "../middlewares/verifyAuth";

async function seedAdmin() {
  try {
    const adminData = {
      name: "FoodHub Admin",
      email: "admin@gmail.com",
      role: Role.ADMIN,
      password: "admin1234",
    };
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("Admin already exists!");
    }

    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:5000",
        },
        body: JSON.stringify(adminData),
      },
    );

    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
    console.log("******* SUCCESS ******");
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
