const axios = require("axios");
const cheerio = require("cheerio");
const { resolve } = require("path");
const fs = require('fs');
const BodyForm = require('form-data');
const { fromBuffer } = require('file-type');

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.fetchBuffer = async (url, options = {}) => {
    try {
        const res = await axios({
            method: "GET",
            url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            responseType: 'arraybuffer',
            ...options
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch buffer");
    }
}

exports.fetchUrl = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'GET',
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch URL");
    }
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'gi'));
}

exports.isNumber = (number) => {
    const int = parseInt(number);
    return typeof int === 'number' && !isNaN(int);
}

// MediaFire download link extraction
exports.mediafireDl = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const downloadLink = $('a[href^="https://download.mediafire.com/"]').attr('href');
        
        if (downloadLink) {
            return {
                status: true,
                link: downloadLink
            };
        } else {
            throw new Error("Failed to extract download link from MediaFire");
        }
    } catch (error) {
        console.error("MediaFire DL Error:", error);
        throw new Error("Failed to fetch MediaFire download link");
    }
}
