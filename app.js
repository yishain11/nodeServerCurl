import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json()); // To parse JSON bodies

// Step 1: Start the hunt
app.get('/start', (req, res) => {
    res.json({
        message: "Welcome to the hunt! Your next hint is hidden at /next"
    });
});

// Step 2: Simple GET
app.get('/next', (req, res) => {
    res.json({
        message: "Good job! Now send a POST request to /submit with JSON { \"code\": \"hunter\" }"
    });
});

// Step 3: POST with JSON body
app.post('/submit', (req, res) => {
    const { code } = req.body;
    if (code === "hunter") {
        res.json({
            message: "Nice one! Now send a PUT to /update with header X-Secret-Key: magic123"
        });
    } else {
        res.status(400).json({ error: "Wrong code. Check the hint again." });
    }
});

// Step 4: PUT with header check
app.put('/update', (req, res) => {
    const secret = req.header('X-Secret-Key');
    if (secret === "magic123") {
        res.json({
            message: "Almost done! Now DELETE /final with query param token=theend"
        });
    } else {
        res.status(403).json({ error: "Missing or incorrect X-Secret-Key header." });
    }
});

// Step 5: Final DELETE with query param
app.delete('/final', (req, res) => {
    const { token } = req.query;
    if (token === "theend") {
        res.json({
            message: "🎉 You did it! The hunt is over.",
            secret: `"The only way to learn a new programming language is by writing programs in it." — Dennis Ritchie`,
            note: "Remember, every HTTP call you mastered today brings you closer to real-world skills!"
        });
    } else {
        res.status(400).json({ error: "Invalid or missing token." });
    }
});

// Handle wrong paths or methods
app.use((req, res) => {
    res.status(404).json({
        error: "Hmm... wrong move. Check your hint and try again."
    });
});

app.listen(PORT, () => {
    console.log(`HTTP Hunt server running on http://localhost:${PORT}`);
});
