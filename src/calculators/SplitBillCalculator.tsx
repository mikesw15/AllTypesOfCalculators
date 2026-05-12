import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { DollarSign, Users, Receipt, Percent } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

interface Friend {
  id: string;
  name: string;
  amount: number;
}

export default function SplitBillCalculator() {
  const { saveToHistory } = useHistory();
  const [subtotal, setSubtotal] = useState<number>(100);
  const [taxPercent, setTaxPercent] = useState<number>(8.5);
  const [tipPercent, setTipPercent] = useState<number>(20);
  
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'Alice (Me)', amount: 45 },
    { id: '2', name: 'Bob', amount: 35 },
    { id: '3', name: 'Charlie', amount: 20 },
  ]);

  const addFriend = () => {
    setFriends([...friends, { id: Math.random().toString(), name: `Friend ${friends.length + 1}`, amount: 0 }]);
  };

  const removeFriend = (id: string) => {
    setFriends(friends.filter(f => f.id !== id));
  };

  const updateFriend = (id: string, field: 'name' | 'amount', value: string | number) => {
    setFriends(friends.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const results = useMemo(() => {
    const totalAssigned = friends.reduce((sum, f) => sum + f.amount, 0);
    const taxRatio = taxPercent / 100;
    const tipRatio = tipPercent / 100;

    const taxAmount = subtotal * taxRatio;
    const tipAmount = subtotal * tipRatio;
    const totalBill = subtotal + taxAmount + tipAmount;

    // Use totalAssigned instead of subtotal for calculating ratios, 
    // in case they haven't assigned all items to match exactly subtotal yet
    const baseForRatio = totalAssigned > 0 ? totalAssigned : 1;

    const splits = friends.map(friend => {
      const shareRatio = friend.amount / baseForRatio;
      const friendTax = taxAmount * shareRatio;
      const friendTip = tipAmount * shareRatio;
      const friendTotal = friend.amount + friendTax + friendTip;
      return {
        ...friend,
        shareRatio,
        friendTax,
        friendTip,
        friendTotal
      };
    });

    return {
      totalAssigned,
      taxAmount,
      tipAmount,
      totalBill,
      splits
    };
  }, [subtotal, taxPercent, tipPercent, friends]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToHistory(
        'split-bill-calculator',
        'Split Bill',
        { subtotal, taxPercent, tipPercent, friendsCount: friends.length },
        { totalBill: results.totalBill.toFixed(2), totalAssigned: results.totalAssigned.toFixed(2) }
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, [subtotal, taxPercent, tipPercent, friends.length, results, saveToHistory]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalculatorInput label="Subtotal ($)" value={subtotal} onChange={setSubtotal} icon={Receipt} min={0} />
          <CalculatorInput label="Tax (%)" value={taxPercent} onChange={setTaxPercent} icon={Percent} min={0} />
          <CalculatorInput label="Tip (%)" value={tipPercent} onChange={setTipPercent} icon={Percent} min={0} />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Friends' Items
            </h3>
            <button onClick={addFriend} className="text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
              + Add Friend
            </button>
          </div>
          
          <div className="space-y-3">
            {friends.map((friend, index) => (
              <div key={friend.id} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={friend.name}
                  onChange={(e) => updateFriend(friend.id, 'name', e.target.value)}
                  className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                  placeholder="Name"
                />
                <div className="relative w-32">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    value={friend.amount || ''}
                    onChange={(e) => updateFriend(friend.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                {friends.length > 1 && (
                  <button 
                    onClick={() => removeFriend(friend.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Unassigned / Discrepancy:</span>
            <span className={`font-bold ${Math.abs(subtotal - results.totalAssigned) > 0.01 ? 'text-red-500' : 'text-green-500'}`}>
              ${(subtotal - results.totalAssigned).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <CalculatorResult
            label="Total Bill"
            value={`$${results.totalBill.toFixed(2)}`}
            color="blue"
          />
          <CalculatorResult
            label="Total Tip"
            value={`$${results.tipAmount.toFixed(2)}`}
            color="green"
          />
        </div>

        <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
          <h3 className="font-bold text-gray-900 mb-4">Proportional Breakdown</h3>
          <div className="space-y-4">
            {results.splits.map((split) => (
              <div key={split.id} className="flex flex-col border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-900">{split.name}</span>
                  <span className="font-black text-gray-900 text-lg">${split.friendTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Items: ${split.amount.toFixed(2)}</span>
                  <span>Tax: ${split.friendTax.toFixed(2)} | Tip: ${split.friendTip.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          Tax and tip are distributed proportionally based on each person's item total.
        </p>
      </div>
    </div>
  );
}
