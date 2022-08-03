import React, { useState, useEffect} from 'react'
import './MyPosts.css'
import { Grid, Card } from '@material-ui/core'
import axios from 'axios'



const MyPosts = () => {

    const [myMoods, setMyMoods] = useState([])
    
    const getMyPosts = async () => {
        await axios.get('http://localhost:4000/post/:id')
            .then((response) => {
                console.log(response);
                setMyMoods(response.data)
            }).catch((err) => {
                console.log(err);
            })
    }

      useEffect(()=>{
    
        getMyPosts();

      }, [])

  return (
    <div className='secondary'>
        <Grid container className='all-moods'>                              
            {myMoods.map((myMoods, key) => {
                return (
                    <Grid item xs={6} md={2} className='outlook'>
                        <Card>
                            <div key={myMoods._id} className='mood-board'>
                                <h3 className='posted-by'>{myMoods.postedBy}</h3>
                                <h4 className='mood-title'>{myMoods.title}</h4>
                                <h4 className='mood'>{ myMoods.mood}</h4>
                            </div>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    </div>          
  )
}

export default MyPosts