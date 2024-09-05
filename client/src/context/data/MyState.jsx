import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp } from 'firebase/firestore'
import { fireDB } from '../../firebase/FireBaseConfig'
import { toast } from 'react-toastify'

function MyState(props) {
    const [mode,setMode]=useState('light')

    const toggleMode=()=>{
        if(mode==='light'){
            setMode('dark')
            document.body.style.backgroundColor="rgb(17,24,39)"
        }
        else{
            setMode('light')
            document.body.style.backgroundColor="white"
        }
    }

    const [products,setProducts]=useState({
        title:null,
        price:null,
        imageUrl:null,
        category:null,
        description:null,
        time:Timestamp.now(),
        date:new Date().toLocaleString(
            'en-US',{
                month:"short",
                day:"2-digit",
                year:"numeric",
            }
        )
    });

    const addProduct=async()=>{
        if(products.title===null || products.price===null || products.imageUrl===null || products.category===null || products.description===null){
            return toast.error("all fields are required");
        }
        setLoading(true);
        try {
            const productRef=collection(fireDB,"products");

            await addDoc(productRef,products);
            toast.success("Add product successfully");
            setTimeout(()=>{
                window.location.href='/dashboard';
            },6000)
            getProductData();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const[product,setProduct]=useState([])
    const getProductData=async()=>{
        setLoading(true);
        try {
            const q=query(collection(fireDB,'products'),
               orderBy('time')
        );
        const data=onSnapshot(q,(QuerySnapshot)=>{
            let productArray=[];
            QuerySnapshot.forEach((doc)=>{
                productArray.push({...doc.data(), id:doc.id})
            });
            setProduct(productArray);
            setLoading(false);
        });
        return ()=>data;
        

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(()=>{
        getProductData();
    },[]);

    const editHandle=(item)=>{
        setProducts(item);
    }
    const updateProduct=async(item)=>{
        setLoading(true)
        try {
            await setDoc(doc(fireDB,'products',products.id),products);
            toast.success("product update sucessfully");
            setTimeout(() => {
                window.location.href='/dashboard'
            }, 3000);
            getProductData();
            
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const deleteProduct=async(item)=>{
        setLoading(true)
        try {

           await deleteDoc(doc(fireDB,'products',item.id));
           toast.success("product delete successfully");
           setLoading(false)
           getProductData();
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const [order,setOrder]=useState([]);
    const getOrderData=async()=>{
        setLoading(true);
        try {
            const result=await getDocs(collection(fireDB,'order'));
            const orderArray=[];
            result.forEach((doc)=>{
                orderArray.push(doc.data());
                setLoading(false);
            
            });
            setOrder(orderArray);
            console.log(orderArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const [user,setUser]=useState([])

    const getUserData=async()=>{
        setLoading(true);
        try {
            const result=await getDocs(collection(fireDB,"user"))
            const useArray=[];
            result.forEach((doc)=>{
                useArray.push(doc.data());
                setLoading(false);
            });
            setUser(useArray);
            console.log(useArray);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getOrderData();
        getUserData();
    },[]);

    const [searchkey,setSearchkey]=useState('')
    const [filterType,setFilterType]=useState('')
    const [filterPrice,setFilterPrice]=useState('')

    const [loading,setLoading]=useState(false);
    return (
        <MyContext.Provider value={{mode,toggleMode,loading,setLoading,product,products,setProducts,addProduct,editHandle,updateProduct,deleteProduct,order,user,searchkey,setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice}}>
            {props.children}
        </MyContext.Provider>
    );
}

export default MyState
