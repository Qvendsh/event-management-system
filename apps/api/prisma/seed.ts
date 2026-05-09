import { PrismaClient, EventCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.event.deleteMany();

    await prisma.event.createMany({
        data: [
            {
                title: 'React Meetup Lviv',
                description: 'Frontend meetup about React, Next.js and modern UI development.',
                date: new Date('2026-06-15T18:00:00.000Z'),
                location: 'Lviv',
                category: EventCategory.MEETUP,
                latitude: 49.8397,
                longitude: 24.0297,
            },
            {
                title: 'Node.js Workshop Lviv',
                description: 'Backend workshop about Node.js, NestJS and API design.',
                date: new Date('2026-06-18T18:00:00.000Z'),
                location: 'Lviv',
                category: EventCategory.WORKSHOP,
                latitude: 49.8397,
                longitude: 24.0297,
            },
            {
                title: 'Frontend Conference',
                description: 'Conference for frontend developers focused on React and UI architecture.',
                date: new Date('2026-06-20T10:00:00.000Z'),
                location: 'Kyiv',
                category: EventCategory.CONFERENCE,
                latitude: 50.4501,
                longitude: 30.5234,
            },
            {
                title: 'Product Design Meetup',
                description: 'Meetup about UX, product thinking and design systems.',
                date: new Date('2026-06-22T17:30:00.000Z'),
                location: 'Lviv',
                category: EventCategory.MEETUP,
                latitude: 49.8397,
                longitude: 24.0297,
            },
            {
                title: 'Cloud Engineering Workshop',
                description: 'Practical workshop about Docker, deployment and cloud basics.',
                date: new Date('2026-07-01T15:00:00.000Z'),
                location: 'Kyiv',
                category: EventCategory.WORKSHOP,
                latitude: 50.4501,
                longitude: 30.5234,
            },
            {
                title: 'JavaScript Community Meetup',
                description: 'Community event for JavaScript developers and beginners.',
                date: new Date('2026-07-05T18:00:00.000Z'),
                location: 'Odesa',
                category: EventCategory.MEETUP,
                latitude: 46.4825,
                longitude: 30.7233,
            },
            {
                title: 'Summer Music Concert',
                description: 'Open-air concert with local bands and artists.',
                date: new Date('2026-07-10T19:00:00.000Z'),
                location: 'Lviv',
                category: EventCategory.CONCERT,
                latitude: 49.8397,
                longitude: 24.0297,
            },
            {
                title: 'Startup Pitch Night',
                description: 'Evening event where startup founders present their ideas.',
                date: new Date('2026-07-12T18:30:00.000Z'),
                location: 'Kyiv',
                category: EventCategory.OTHER,
                latitude: 50.4501,
                longitude: 30.5234,
            },
            {
                title: 'Football Charity Match',
                description: 'Charity football match with local teams.',
                date: new Date('2026-07-15T16:00:00.000Z'),
                location: 'Lviv',
                category: EventCategory.SPORT,
                latitude: 49.8397,
                longitude: 24.0297,
            },
            {
                title: 'AI and Web Development Conference',
                description: 'Conference about AI tools, web development and automation.',
                date: new Date('2026-07-20T09:00:00.000Z'),
                location: 'Kyiv',
                category: EventCategory.CONFERENCE,
                latitude: 50.4501,
                longitude: 30.5234,
            },
        ],
    });

    console.log('Seed data created successfully');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });