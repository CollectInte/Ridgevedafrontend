'use client'
import axios from 'axios';
import LayoutOne from "@/components/Layout/LayoutOne";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import Influencerdata from '../Book.json';
import { Button, Card, CardContent } from '@mui/material';

export default function SearchInfluencer(){
    const [search, setSearch] = useState('');
    const [influencers, setInfluencers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    useEffect(()=>{
        const fetchInfluencers = async () => {
        const options = {
            method: 'GET',
            url: 'https://ylytic-influencers-api.p.rapidapi.com/ylytic/admin/api/v1/discovery',
            params: {country: 'India',
                city:'Hyderabad',
                category:'Finance',
                current_page: '1',
                followers:'100000'
            },
            headers: {
              'x-rapidapi-key': 'd1fa17b23amsh3753c23b2d3fd6fp10721fjsn8777fb0661f2',
              'x-rapidapi-host': 'ylytic-influencers-api.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              setInfluencers(response.data.creators);
          } catch (error) {
              console.error(error);
          }
        }
        fetchInfluencers();
    },[])
    // useEffect(() => {
    //     setInfluencers(Influencerdata);
    // },[])

    return(
        <>
        <div className='container-fluid'>
            <div className='row'>
        {influencers.map((values)=>(
            <>
            <div className='col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3'>
            <Card>
                <CardContent>
                <h2>Name:{values.handle}</h2>
                <a href={values.handle_link} target='_blank'><Button>View</Button></a>
                <h2> category:{values.category}</h2>
                <h2>{values.followers} followers</h2>
                </CardContent>
            </Card>
            </div>
            </>
        ))}
        </div>
        </div>
        </>
    )

}