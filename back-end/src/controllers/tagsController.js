const getAllTags = (req, res) => {
    // Implementation
    res.send("All tags fetched successfully.");
};

const getFrequentTags = (req, res) => {
    // Implementation
    res.send("Frequent tags fetched successfully.");
};

module.exports = { getAllTags, getFrequentTags };