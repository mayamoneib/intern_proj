"use client";
import React, { SetStateAction, useEffect } from "react";
import Search from "antd/es/transfer/search";
import styles from "@/app/page.module.css";
import { Card } from 'antd';
import { Carousel } from 'antd';


type Movie={
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string
};

type SearchResults={
     Search:Movie[];
     totalResults:number,
     Response: boolean
};




export default function Home() {
    const [loading, setLoading] = React.useState(false);
    const [data, setData]: [SearchResults | null, any] = React.useState(null);
  
    useEffect(() => {
      fetchData();
    }, []); 
  
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("https://www.omdbapi.com/?apikey=8bdf708a&s=hangover");
      setData(await response.json());
      setLoading(false);
    };
  
function renderMovies(){
    const { Meta } = Card;
    if (!data) return null;
    return data.Search.map((movie: Movie)=>{
        return(
            <Card
            hoverable 
            style={{ width: 240 }}
            cover={<img alt={`${movie.Title} Poster`} src={movie.Poster} />}>
        
            <Meta
                title= {movie.Title} 
                description= {movie.Year}
            />
            </Card>

        );
    });
}



return (
    <main className={styles.main}>
        {loading ? <p>Loading...</p> : renderMovies()}
    </main>
);
}

    
