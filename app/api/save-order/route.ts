import { type NextRequest, NextResponse } from "next/server"
import { writeFile, appendFile, access } from "fs/promises"
import { constants } from "fs"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Format the order data for flat file storage
    const timestamp = new Date().toISOString()
    const orderLine = JSON.stringify({
      ...orderData,
      savedAt: timestamp,
    })

    const filePath = "/home/iinube/solicitudes.txt"

    try {
      // Check if file exists
      await access(filePath, constants.F_OK)
      // File exists, append to it
      await appendFile(filePath, orderLine + "\n")
    } catch {
      // File doesn't exist, create it
      await writeFile(filePath, orderLine + "\n")
    }

    console.log("[v0] Order saved successfully to", filePath)

    return NextResponse.json({
      success: true,
      message: "Orden guardada exitosamente",
      timestamp,
    })
  } catch (error) {
    console.error("[v0] Error saving order:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error al guardar la orden",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
