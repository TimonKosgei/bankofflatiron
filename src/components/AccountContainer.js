import React, {useEffect,useState} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]) 
  const [filteredTransactions, setFilteredTransactions] = useState([])
  useEffect(()=>{
    fetch('http://localhost:8002/transactions')
    .then(res => res.json())
    .then(data => {
      //everything that happens to the transactions state also happens to the filtered transactions
      setTransactions(data)
      setFilteredTransactions(data)
    })
  },[])
  function updateTransaction (newTransaction){
    setTransactions((prev) => [...prev, newTransaction])
    setFilteredTransactions((prev) => [...prev,newTransaction])
  }
  function handleSearching(searchVal)
  {
    if(searchVal.trim()===""){
      setFilteredTransactions(transactions)
    }else{
      const t   = transactions.filter((transaction)=> transaction.description.toLowerCase().includes(searchVal.toLowerCase()))
      setFilteredTransactions(t)
    }
  }
  return (
    <div>
      <Search onSearch =  {handleSearching}/>
      <AddTransactionForm onNewTransaction  = {updateTransaction} />
      <TransactionsList transactions = {filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
