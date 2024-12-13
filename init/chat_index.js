const mongoose = require('mongoose');
const Chat = require("../models/chat"); // Adjust path as needed

const seedChat = async () => {
    try {
        // Define the IDs
        const jobProviderId = '673e200e2b9aebe9c3c80c1d';
        const applicantId = '673e2c929a16e598d796ee03';

        // Create messages array with 10 exchanges
        const messages = [
            {
                content: "Hello! I saw your application for the Senior Developer position.",
                timestamp: new Date('2024-03-08T10:00:00'),
                sender: jobProviderId
            },
            {
                content: "Hi! Yes, I'm very interested in the position. Thank you for reaching out.",
                timestamp: new Date('2024-03-08T10:05:00'),
                sender: applicantId
            },
            {
                content: "Could you tell me more about your experience with React and Node.js?",
                timestamp: new Date('2024-03-08T10:10:00'),
                sender: jobProviderId
            },
            {
                content: "I have 5 years of experience with both technologies. I've built several full-stack applications.",
                timestamp: new Date('2024-03-08T10:15:00'),
                sender: applicantId
            },
            {
                content: "That's great! What was your most challenging project?",
                timestamp: new Date('2024-03-08T10:20:00'),
                sender: jobProviderId
            },
            {
                content: "I led the development of a real-time analytics dashboard that processed data from multiple sources.",
                timestamp: new Date('2024-03-08T10:25:00'),
                sender: applicantId
            },
            {
                content: "Impressive! Are you available for a technical interview next week?",
                timestamp: new Date('2024-03-08T10:30:00'),
                sender: jobProviderId
            },
            {
                content: "Yes, I'm available any day next week in the afternoon.",
                timestamp: new Date('2024-03-08T10:35:00'),
                sender: applicantId
            },
            {
                content: "Perfect, how about Tuesday at 2 PM?",
                timestamp: new Date('2024-03-08T10:40:00'),
                sender: jobProviderId
            },
            {
                content: "Tuesday at 2 PM works perfectly for me. Looking forward to it!",
                timestamp: new Date('2024-03-08T10:45:00'),
                sender: applicantId
            }
        ];

        // Create the chat document
        const chatData = {
            job_provider: jobProviderId,
            applicant: applicantId,
            messages: messages,
            lastUpdated: new Date('2024-03-08T10:45:00')
        };

        // Insert into database
        const chat = new Chat(chatData);
        await chat.save();

        console.log('Chat seeded successfully!');
        console.log('Chat ID:', chat._id);

    } catch (error) {
        console.error('Error seeding chat:', error);
    }
};

// Function to run the seed
const runSeed = async () => {
    try {
        // Connect to MongoDB (adjust the connection string as needed)
        await mongoose.connect('mongodb://127.0.0.1:27017/JobHunt');

        // Run the seed function
        await seedChat();

        // Close the connection
        await mongoose.connection.close();

        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error running seed:', error);
    }
};

// Run the seeding process
runSeed();