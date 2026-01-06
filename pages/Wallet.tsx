import React from 'react';
import { TRANSACTIONS } from '../constants';
import { Plus, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Info, FileText } from 'lucide-react';

const Wallet: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
        <p className="text-gray-500 mt-2">Manage your credits and transaction history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Balance Card */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <WalletIcon className="h-32 w-32" />
            </div>
            
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Current Balance</h2>
            <div className="text-4xl font-bold mb-8">$0.00</div>

            <div className="flex gap-2">
                <button className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1">
                    <Plus className="h-3 w-3" /> $10
                </button>
                 <button className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1">
                    <Plus className="h-3 w-3" /> $20
                </button>
                 <button className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1">
                    <Plus className="h-3 w-3" /> $30
                </button>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4 items-start">
             <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                 <Info className="h-5 w-5 text-blue-600" />
             </div>
             <div>
                 <h4 className="text-sm font-bold text-blue-900 mb-1">Referral Bonus</h4>
                 <p className="text-xs text-blue-700">Refer a friend and get $5.00 in free credits when they connect with their first mentor.</p>
             </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Transaction History</h3>
                </div>
                <div className="flex-1">
                    {TRANSACTIONS.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-gray-400">
                             <div className="bg-gray-50 p-4 rounded-full mb-4">
                                <FileText className="h-8 w-8 text-gray-300" />
                             </div>
                             <p className="text-sm font-medium">No transactions yet</p>
                        </div>
                    ) : (
                        TRANSACTIONS.map((tx) => (
                            <div key={tx.id} className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100' : 'bg-gray-100'}`}>
                                        {tx.type === 'credit' ? (
                                            <ArrowDownLeft className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <ArrowUpRight className="h-5 w-5 text-gray-600" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{tx.description}</div>
                                        <div className="text-xs text-gray-500">{tx.date}</div>
                                    </div>
                                </div>
                                <div className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                                    {tx.type === 'credit' ? '+' : ''}{tx.amount.toFixed(2)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Wallet;