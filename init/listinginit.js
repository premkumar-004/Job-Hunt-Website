const jobListings = [
    {
        title: "Damaged Switch Board",
        description: "Fix a broken switch board in a residential home. Basic electrical skills required.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 50,
        location: "123 Main St, Springfield",
        country: "USA",
    },
    {
        title: "Tap Broken",
        description: "Repair a leaking tap in the kitchen. Plumbing experience preferred.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 30,
        location: "456 Elm St, Springfield",
        country: "USA",
    },
    {
        title: "Painting a Wall",
        description: "Paint a single accent wall in a living room. Paint and supplies will be provided.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 70,
        location: "789 Maple St, Springfield",
        country: "USA",
    },
    {
        title: "Broken Window Replacement",
        description: "Replace a broken window pane. Glass and materials will be provided. Experience preferred.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 90,
        location: "101 Oak St, Springfield",
        country: "USA",
    },
    {
        title: "Furniture Assembly",
        description: "Assemble flat-pack furniture for a new office. Basic tool knowledge required.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 60,
        location: "202 Pine St, Springfield",
        country: "USA",
    },
    {
        title: "Yard Cleanup",
        description: "Basic yard cleanup including raking leaves and removing debris. Tools provided.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 40,
        location: "303 Cedar St, Springfield",
        country: "USA",
    },
    {
        title: "Gutter Cleaning",
        description: "Clean leaves and debris from gutters on a two-story house. Safety equipment provided.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 80,
        location: "404 Birch St, Springfield",
        country: "USA",
    },
    {
        title: "Garden Bed Preparation",
        description: "Prepare garden beds for planting, including tilling and soil preparation.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 55,
        location: "505 Maple St, Springfield",
        country: "USA",
    },
    {
        title: "Dog Walking",
        description: "Walk a friendly dog for 30 minutes around the neighborhood.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 20,
        location: "606 Spruce St, Springfield",
        country: "USA",
    },
    {
        title: "Moving Boxes",
        description: "Assist with moving boxes to a moving truck. Requires some heavy lifting.",
        image: {
            url: "https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=",
        },
        payment: 75,
        location: "707 Chestnut St, Springfield",
        country: "USA",
    },
];

module.exports = { data: jobListings };