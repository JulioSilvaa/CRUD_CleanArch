"use strict";

// src/utils/seed_SchedulesStatus.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
async function seedSchedulesStatus() {
  try {
    await prisma.schedulesStatus.createMany({
      data: [
        { id: "1", status: "Agendado" },
        { id: "2", status: "Confirmado" },
        { id: "3", status: "Cancelado" },
        { id: "4", status: "Conclu\xEDdo" }
      ]
    });
    console.log("Appointment status seeded successfully.");
  } catch (error) {
    console.error("Error seeding appointment status:", error);
  } finally {
    await prisma.$disconnect();
  }
}
seedSchedulesStatus();
