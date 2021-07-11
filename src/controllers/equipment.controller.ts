import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Equipment } from "../models";
import {
  getAllEquipment,
  createEquipment,
  IEquipmentPayload,
  getEquipment,
} from "../repositories/equipment.repository";

@Route("equipment")
@Tags("Equipment")
export default class EquipmentController {
  @Get("/")
  public async getAllEquipment(): Promise<Array<Equipment>> {
    return getAllEquipment();
  }

  @Post("/")
  public async createEquipment(@Body() body: IEquipmentPayload): Promise<Equipment> {
    return createEquipment(body);
  }

  @Get("/:id")
  public async getEquipment(@Path() id: string): Promise<Equipment | null> {
    return getEquipment(Number(id));
  }
}