"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Calendar from "../models/calendar.model";

import { connectToDB } from "../mongoose";

interface Event {
    id: number;
    title: string;
    start: Date | string;
    allDay: boolean;
}

export async function getAllEvent(): Promise<Event[]> {
    try {
      // Se connecter à la base de données
      await connectToDB(); // Assurez-vous de vous connecter à la base de données
  
      // Récupérer tous les événements depuis la base de données
      const eventsFromDB = await Calendar.find({});
  
      // Mapper les événements récupérés depuis la base de données vers le type Event
      const events: Event[] = eventsFromDB.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        allDay: event.allDay,
      }));
  
      return events;
    } catch (error: any) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }
/*
export async function getAllEvent() {
  try {
    connectToDB();

    await Calendar.find({});
    //res.status(200).json({ success: true, data: elements });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
*/


export async function addEventCalendar({
    id,
    title,
    start,
    allDay,
  }: Event): Promise<void> {
    console.log(id)
    try {
      connectToDB();
        console.log(id)
      await Calendar.create({
        id,
        title,
        start,
        allDay
      });
  
    } catch (error: any) {
      throw new Error(`Failed to create/update user: ${error.message}`);
    }
  }

  export async function deleteEventCalendar(_id: number){
    console.log("DELETE")
    try {
      connectToDB();
        console.log(_id)
      await Calendar.deleteOne({
        id:_id
      });
  
    } catch (error: any) {
      throw new Error(`Failed to create/update user: ${error.message}`);
    }
  }


// 1700212605672



