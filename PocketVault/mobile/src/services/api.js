const API_URL = process.env.EXPO_PUBLIC_API_URL;


// GET - Read Items
export async function getItems() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return response.json();
}


// POST - Create Item
export async function createItem(item) {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });

  if (!response.ok) {
    throw new Error("Failed to create item");
  }

  return response.json();
}


// PATCH - Update Item
export async function updateItem(id, data) {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to update item");
  }

  return response.json();
}


// DELETE - Delete Item
export async function deleteItem(id) {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  return response.json();
}