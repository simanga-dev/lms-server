/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { Prisma, PrismaClient } from '@prisma/client';

const default_select = Prisma.validator<Prisma.livestockSelect>()({
    id: true,
    distribution: true,
    comments: true,
    characteristics: true,
    name: true,
    type_of_wool: true,
    Latitude: true,
    Longitude: true,
    temperature: true,
    ring_bell: true,
    created_at: true,
    motion_update_at: true,
    out_of_range: true
});

const sheep = [
    {
        distribution: "developed in U.S. since 1912 ",
        comments: "high wool yield; mutton acceptable",
        characteristics: "large, white-faced, hornless ",
        name: "Columbia",
        type_of_wool: "medium ",
        Latitude: 45.95734974,
        Longitude: 12.95734974,
        temperature: 20.753
    },
    {
        distribution: "developed in N.Z., now also in U.S., Australia ",
        comments: "high wool yield; mutton acceptable",
        characteristics: "white-faced, hornless ",
        name: "Corriedale",
        type_of_wool: "medium",
        Latitude: -45.95734974,
        Longitude: 13.95734974,
        temperature: 24.753
    },
    {
        distribution: "originally England, now also U.S. ",
        comments: "coarse, curly fleece; acceptable mutton ",
        characteristics: " large, white-faced, hornless ",
        name: "Cotswold ",
        type_of_wool: "long",
        Latitude: -15.95734974,
        Longitude: 13.95734974,
        temperature: 22.73
    },
    {
        distribution: "developed in England, now in U.K., U.S., Australia",
        comments: "small wool yield; out-of-season lambs; horned and hornless varieties ",
        characteristics: "medium-sized, white-faced ",
        name: "Dorset",
        type_of_wool: "medium",
        Latitude: -45.95734974,
        Longitude: 12.95734974,
        temperature: 12.73
    },

    {
        distribution: "developed in England, now also widespread in U.S. ",
        comments: "superior mutton breed; limited wool ",
        characteristics: "large, hornless; dark face and legs ",
        name: "Hampshire 	",
        type_of_wool: "medium",
        Latitude: -45.95734974,
        Longitude: 12.95734974,
        temperature: 12.73
    },
    {
        distribution: "originally Central Asia, now also Africa, Europe, U.S. ",
        comments: "coats of very young lambs called Persian lamb",
        characteristics: "medium-sized, fat-tailed ",
        name: "Karakul 	",
        type_of_wool: "fur 	",
        Latitude: -45.95734974,
        Longitude: 12.95734974,
        temperature: 12.73
    },

    {
        distribution: "originally England, now U.K., North America ",
        comments: "heavy fleece Lincoln ram.",
        characteristics: "massive body, white-faced, broad-backed ",
        name: "Leicester",
        type_of_wool: "long",
        Latitude: -45.95734974,
        Longitude: 12.95734974,
        temperature: 12.73
    },

    {
        distribution: "originally England, now also Australia, N.Z., North and South America",
        comments: "coarse, long wool is used chiefly for carpets",
        characteristics: "world's largest sheep, hornless",
        name: "Lincoln",
        type_of_wool: "long",
        Latitude: -45.95734974,
        Longitude: 12.95734974,
        temperature: 12.73
    },

    {
        distribution: "originally Spain, now also Australia, North America, South Africa  ",
        comments: "excellent, fine, soft fleeces",
        characteristics: "horned or hornless, heavily-wooled head",
        name: "Merino",
        type_of_wool: "fine",
        Latitude: -45.95734974,
        Longitude: 12.95734974,
        temperature: 12.73
    },

    {
        distribution: "originally Scotland, now widespread",
        comments: "hardy; produces superior fleece",
        characteristics: "white chalk; large, deep-bodied",
        name: "North Country Cheviot",
        type_of_wool: "medium",
        Latitude: -45.95734974,
        Longitude: -12.95734974,
        temperature: 12.73
    },

    {
        distribution: "developed in France from the 18th century, now also in U.S.",
        comments: "lambs mature rapidly; bred from Merino",
        characteristics: "smooth-bodied, horned or hornless",
        name: "Rambouillet",
        type_of_wool: "fine",
        Latitude: -5.95734974,
        Longitude: -12.95734974,
        temperature: 12.73
    },

    {
        distribution: "originally England, now also N.Z., North America, Australia",
        comments: "mostly raised for mutton; wool used for variety of products",
        characteristics: "hornless with white face and legs",
        name: "Romney",
        type_of_wool: "long",
        Latitude: -5.95734974,
        Longitude: 12.95734974,
        temperature: 24.73
    },

    {
        distribution: "originally England, now also N.Z., Australia, North America",
        comments: "raised for mutton; fleece is short",
        characteristics: "hornless with small, rounded body",
        name: "Southdown",
        type_of_wool: "medium",
        Latitude: -45.95734974,
        Longitude: 12.95734974,
        temperature: 12.73
    },
    {
        distribution: "originally England, now also N.Z., Australia, North America",
        comments: "fine mutton breed; acceptable wool",
        characteristics: "black face and legs, large, hornless",
        name: "Suffolk",
        type_of_wool: "medium",
        Latitude: -45.95734974,
        Longitude: 11.95734974,
        temperature: 13.73
    },

]





const prisma = new PrismaClient();

async function main() {
    sheep.map(async (item) => {
        await prisma.livestock.create({
            data: item,
            select: default_select,
        });
    })
}



main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
