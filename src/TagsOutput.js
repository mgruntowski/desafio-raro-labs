import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    row: {
        margin: theme.spacing(2, 0)
    },
    list: {
        borderRadius: '5px',
        border: '1px solid rgb(200, 200, 200)'
    }
}))

export default function TagsOutput(props) {
    const classes = useStyles()
    const [tagsVisible, setTagsVisible] = useState(false)

    return (<>
        <Grid className={classes.row} container direction="row" justify="center" alignItems="center">
            <Button variant="contained" color="primary" onClick={() => setTagsVisible(!tagsVisible)}>
                { tagsVisible ? 'Esconder tags' : 'Visualizar tags' }
            </Button>
        </Grid>

        { tagsVisible && <>
            <Typography variant="h6">
                Tags inseridas
            </Typography>
            <List className={classes.list} dense>
                { props.tags.map((tag, index) => 
                    <ListItem key={index}>
                        <ListItemText>
                            {tag}
                        </ListItemText>
                    </ListItem> 
                )}
            </List>
        </>}
    </>)
}