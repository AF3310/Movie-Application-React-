// Test script to check environment variables
console.log('Testing environment variables...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('TMDB_API_KEY exists:', !!process.env.TMDB_API_KEY);
console.log('TMDB_API_KEY length:', process.env.TMDB_API_KEY ? process.env.TMDB_API_KEY.length : 0);
console.log('All env vars containing TMDB:', Object.keys(process.env).filter(key => key.includes('TMDB'))); 