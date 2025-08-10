#!/bin/bash

# Start Django server in background
echo "Starting Django server..."
cd ecommercesite
python manage.py runserver 8000 &
DJANGO_PID=$!

# Go back to root and start React dev server
cd ..
echo "Starting React dev server..."
npm run dev &
REACT_PID=$!

# Wait for both processes
wait $DJANGO_PID $REACT_PID
