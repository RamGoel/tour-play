import { destinationArray } from "@/lib/data";

export async function GET(){
    return Response.json(destinationArray, {status:200})
}