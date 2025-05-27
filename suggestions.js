export const weatherSuggestions = [
    {
        keywords: ["rain", "thunderstorm"],
        heading: "Safety Measures",
        suggestion: "Please use an umbrella ☔",
        measures: [
            "Carry an umbrella or raincoat",
            "Avoid driving through flooded streets",
            "Wear waterproof footwear"
        ]
    },
    {
        keywords: ["clear"],
        heading: "Safety Measures",
        suggestion: "It's a sunny day 😎 stay hydrated!",
        measures: [
            "Drink plenty of water",
            "Wear sunglasses and sunscreen",
            "Avoid going out during peak sun hours"
        ]
    },
    {
        keywords: ["cloud"],
        heading: "Safety Measures",
        suggestion: "Weather is cloudy ☁️",
        measures: [
            "Carry a light jacket",
            "Check weather updates before heading out"
        ]
    },
    {
        keywords: ["snow"],
        heading: "Safety Measures",
        suggestion: "Dress warmly ❄️ Winter is on!",
        measures: [
            "Wear layers and winter boots",
            "Drive slowly and carefully",
            "Keep emergency supplies if traveling"
        ]
    },
    {
        keywords: ["mist", "fog", "haze"],
        heading: "Safety Measures",
        suggestion: "Drive carefully 🌫️ visibility is low.",
        measures: [
            "Use fog lights while driving",
            "Avoid high-speed travel",
            "Be extra cautious on roads"
        ]
    },
    {
        keywords: [],
        heading: "🌍 General Weather: Safety Tips",
        suggestion: "Have a nice day!",
        measures: [
            "Stay safe and enjoy your day!"
        ]
    }
];

// ✅ Return full suggestion object
export function getWeatherSuggestion(description) {
    description = description.toLowerCase();

    for (const entry of weatherSuggestions) {
        if (entry.keywords.some(keyword => description.includes(keyword))) {
            return entry; // ✅ Return full object
        }
    }

    return weatherSuggestions[weatherSuggestions.length - 1]; // Default suggestion
}
