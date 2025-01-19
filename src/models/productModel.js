import sql from '../db/db.js';

export async function fetchProducts(filters) {
  try {
    let query = sql`SELECT * FROM products WHERE 1=1`;

    if (filters.category) {
      query = sql`${query} AND category = ${filters.category}`;
    }

    if (filters.minPrice && filters.maxPrice) {
      query = sql`${query} AND price BETWEEN ${filters.minPrice} AND ${filters.maxPrice}`;
    }

    if (filters.rating) {
      query = sql`${query} AND rating = ${filters.rating}`;
    }

    if (filters.search) {
      query = sql`${query} AND (
          name ILIKE ${'%' + filters.search + '%'} OR
          category ILIKE ${'%' + filters.search + '%'} OR
          description ILIKE ${'%' + filters.search + '%'} OR
          full_description ILIKE ${'%' + filters.search + '%'} OR
          subcategory ILIKE ${'%' + filters.search + '%'}
      )`;
    }

    return await query;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
}


