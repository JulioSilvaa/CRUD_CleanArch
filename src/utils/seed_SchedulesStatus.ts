import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedSchedulesStatus() {
  try {
    await prisma.schedulesStatus.createMany({
      data: [
        { id: "1", name: "Agendado" },
        { id: "2", name: "Confirmado" },
        { id: "3", name: "Cancelado" },
        { id: "4", name: "Concluído" },
      ],
    });
    console.log("Appointment status seeded successfully.");
  } catch (error) {
    console.error("Error seeding appointment status:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSchedulesStatus();
