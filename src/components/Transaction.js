import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './../translations/i18n';

export default function Transaction({childToParent}){
    const { t } = useTranslation();
    let wallet_address = '';
    const [transactions, setTransactions] = useState([]);
    const [totalAffiliation, setTotalAffiliation] = useState(0);
    const history = useHistory();
    const token  = localStorage.getItem('slamtoken');
    
    async function fetchdata(){
        const res = await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/token', {token:token});
        
        if(res.data.status === 'ok'){
            wallet_address = res.data.address;
            childToParent(res.data)
            // console.log(wallet_address, "wallet_address")
        }else{
            localStorage.setItem('slamtoken', '');
            localStorage.setItem('isLogin', '');
            history.push('/');
        }
    }
    
    async function fetchTranHist() {
        const res = await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/transaction', {token:token, wallet_address: wallet_address});
        if(res.data.status === 'ok'){
            let transactions = res.data.transactions;
            let totalAffiliation   = res.data.totalAffiliation;
            setTransactions(transactions);
            setTotalAffiliation(totalAffiliation);
        }
    }
    
    useEffect(()=> {
        fetchdata();
        fetchTranHist();
    }, []);

    return (
        <div className="row main">
            <div className="col-lg-12 col-md-12 main-content" style={{height: '100vh'}}>
                <div className="mobile"><i className="fa fa-bars"></i></div>
                <h3 className="transaction-title text-left">{t('Transactions')}</h3>
                {/* <p className="all-yours text-center">All of Your Transactions</p> */}
                {/* <a className="reports" href>Doanload reports</a> */}
                <div className="transaction-table">
                    {/* <hr/> */}
                    <div className="table-responsive trans-table">
                        {/* <p className="update-transaction"> Updated Table 
                            <span className="refresh">
                                <img src="image/refresh.png" className="refresh-img" alt=""/>
                            </span>
                        </p> */}
                        {/* <p className="update-transaction"> Total Affiliation: {totalAffiliation} $SLM </p> */}
                        <Table celled>
                            <Table.Header>
                                <Table.Row role="row">
                                    <Table.HeaderCell>{t('Time')}</Table.HeaderCell>
                                    <Table.HeaderCell>{t('Email')}</Table.HeaderCell>
                                    <Table.HeaderCell>{t('Type')}</Table.HeaderCell>
                                    <Table.HeaderCell>{t('Asset')}</Table.HeaderCell>
                                    <Table.HeaderCell>{t('Amount')}</Table.HeaderCell>
                                    <Table.HeaderCell>{t('Contract')}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                            {transactions.map((transaction, key) => {
                                return  <Table.Row key={key}>
                                            <Table.Cell>{transaction.created_at}</Table.Cell>
                                            <Table.Cell>{transaction.email}</Table.Cell>
                                            <Table.Cell>
                                            {transaction.method == "AFFILIATION" && 
                                            <span className="text-affiliate">
                                               {t('Affiliations')} (3%)
                                             </span>}
                                             {(transaction.method == "Deposit") && 
                                            <span className="text-deposit">
                                               {t('Deposit')}
                                             </span>}
                                             {(transaction.method == "DEDUCT") && 
                                            <span className="text-deduct">
                                               {t('DEDUCT')}
                                             </span>}
                                             {(transaction.method == "BONUS") && 
                                            <span className="text-bonus">
                                               {t('BONUS')}
                                             </span>}
                                             {(transaction.method == "Swap") && 
                                            <span className="text-swap">
                                               {t('Swap')}
                                             </span>}
                                             </Table.Cell>
                                            <Table.Cell>
                                                <p>{transaction.asset}</p>
                                            </Table.Cell>
                                            <Table.Cell>{Math.abs(parseFloat(transaction.amount).toFixed(3))}</Table.Cell>
                                            <Table.Cell>{transaction.address}</Table.Cell>
                                            {/* <Table.Cell>{transaction.address.slice(0,17)}...</Table.Cell> */}
                                        </Table.Row>
                                }
                            )}
                            </Table.Body>
                        </Table>
                    </div>
                    {/* <div className="trans-pagination">
                        <ul className="pagination">
                            <li class="page-item"><a className="page-link" href>1</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
}