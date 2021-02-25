import React from 'react'
import axios from 'axios'
import styles from  './project.module.less'
export default function Project(){
    return <div className={styles.project} onClick={()=>{
        console.log(88);
        axios.get("/api")}}>
            Project</div>
}
