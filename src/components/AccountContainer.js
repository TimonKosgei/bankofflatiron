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
    fetch('http://localhost:8002/transactions')
    .then(res => res.json())
    .then(data => {
      //everything that happens to the transactions state also happens to the filtered transactions
      setTransactions(data)
      setFilteredTransactions(data)
    })
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

  function deleteTransaction(transactionId){
    fetch(`http://localhost:8002/transactions/${transactionId}`, { 
      method: 'DELETE', 
    })
      .then((response) => {
        if (response.ok) {
          setTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction.id !== transactionId)
          );
          setFilteredTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction.id !== transactionId)
          );
          console.log('Item deleted successfully.');
        } else {
          console.error('Failed to delete the item.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
    

  }
  return (
    <div>
      <Search onSearch =  {handleSearching}/>
      <AddTransactionForm onNewTransaction  = {updateTransaction} />
      <TransactionsList deleteTransaction={deleteTransaction} transactions = {filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
