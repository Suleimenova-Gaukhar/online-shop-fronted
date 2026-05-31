const BASE_URL = 'http://localhost:8080';
//BACKEDN API COMMUNICATION

//Done by Gaukhar Suleimenova

/*
This file contains all the functions that communicate with the backend.
Every endpoint from the Spring Boot backend has a corresponding function here.
Instead of writing fetch() calls scattered across every page, we keep them 
all in one place — so if anything changes in the backend, we only fix it here.
*/

// Everything related to registering and logging in users

async function registerBuyer(email, password) {
    const response = await fetch(`${BASE_URL}/auth/registerBuyer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.text();
}

async function registerSeller(email, password) {
    const response = await fetch(`${BASE_URL}/auth/registerSeller`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.text();
}

async function login(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.text();
}

// Everything related to browsing and managing products

async function getAllProducts() {
    const response = await fetch(`${BASE_URL}/products`);
    return response.json();
}

async function addProduct(name, price, description, negotiable, minimumPrice, sellerEmail) {
    const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, description, negotiable, minimumPrice, sellerEmail })
    });
    return response.text();
}

async function deleteProduct(productId, sellerEmail) {
    const response = await fetch(`${BASE_URL}/products/${productId}?sellerEmail=${sellerEmail}`, {
        method: 'DELETE'
    });
    return response.text();
}

// Everything related to price negotiation between buyers and sellers

async function makeOffer(productId, buyerEmail, offeredPrice) {
    const response = await fetch(`${BASE_URL}/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, buyerEmail, offeredPrice })
    });
    return response.text();
}

async function approveOffer(offerId, sellerEmail) {
    const response = await fetch(`${BASE_URL}/offers/${offerId}/approve?sellerEmail=${sellerEmail}`, {
        method: 'PUT'
    });
    return response.text();
}

async function rejectOffer(offerId, sellerEmail) {
    const response = await fetch(`${BASE_URL}/offers/${offerId}/reject?sellerEmail=${sellerEmail}`, {
        method: 'PUT'
    });
    return response.text();
}

async function getOffersBySellerEmail(sellerEmail) {
    const response = await fetch(`${BASE_URL}/offers?sellerEmail=${sellerEmail}`);
    return response.json();
}

// Get a specific buyer's offer for a specific product
async function getOfferByProductAndBuyer(productId, buyerEmail) {
    try {
        const response = await fetch(
            `${BASE_URL}/offers/${productId}/buyer?buyerEmail=${buyerEmail}`
        );
        if (!response.ok) return null; // handles 404, 500, any error
        const text = await response.text();
        if (!text || text.trim() === '') return null;
        return JSON.parse(text);
    } catch(e) {
        return null;
    }
}

// Everything related to completing a sale

async function purchaseProduct(productId, buyerEmail) {
    const response = await fetch(`${BASE_URL}/purchase/${productId}?buyerEmail=${buyerEmail}`, {
        method: 'POST'
    });
    return response.text();
}

async function getSaleHistory() {
    const response = await fetch(`${BASE_URL}/history`);
    return response.json();
}

// Everything related to admin managing seller accounts

async function getAllSellers() {
    const response = await fetch(`${BASE_URL}/admin/sellers`);
    return response.json();
}

async function approveSeller(sellerId) {
    const response = await fetch(`${BASE_URL}/admin/approveSeller/${sellerId}`, {
        method: 'PUT'
    });
    return response.text();
}

async function deactivateSeller(sellerId) {
    const response = await fetch(`${BASE_URL}/admin/deactivateSeller/${sellerId}`, {
        method: 'PUT'
    });
    return response.text();
}