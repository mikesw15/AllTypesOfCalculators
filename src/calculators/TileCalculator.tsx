import React, { useState } from 'react';
import { Grid, Ruler, Box, Info, AlertTriangle } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import CalculatorToggle from '../components/calculator/CalculatorToggle';
import { useCurrency } from '../contexts/CurrencyContext';

export default function TileCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [roomLength, setRoomLength] = useState<number>(12);
  const [roomWidth, setRoomWidth] = useState<number>(10);
  const [tileLength, setTileLength] = useState<number>(12);
  const [tileWidth, setTileWidth] = useState<number>(12);
  const [groutWidth, setGroutWidth] = useState<number>(0.125);
  const [wasteFactor, setWasteFactor] = useState<number>(10);
  const [tilesPerBox, setTilesPerBox] = useState<number>(10);
  const [pricePerTile, setPricePerTile] = useState<number>(0);

  // Calculations
  const roomAreaSqFt = roomLength * roomWidth;
  
  // Convert tile dimensions to feet including grout
  const tileAreaSqFt = ((tileLength + groutWidth) * (tileWidth + groutWidth)) / 144;
  
  const tilesNeeded = Math.ceil(roomAreaSqFt / tileAreaSqFt);
  const tilesWithWaste = Math.ceil(tilesNeeded * (1 + wasteFactor / 100));
  const boxesNeeded = Math.ceil(tilesWithWaste / tilesPerBox);
  const totalCost = tilesWithWaste * pricePerTile;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-blue-500" />
              Room Dimensions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Length"
                value={roomLength}
                onChange={setRoomLength}
                suffix="ft"
                min={0}
              />
              <CalculatorInput
                label="Width"
                value={roomWidth}
                onChange={setRoomWidth}
                suffix="ft"
                min={0}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Grid className="w-5 h-5 text-blue-500" />
              Tile & Grout Details
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <CalculatorInput
                label="Tile Length"
                value={tileLength}
                onChange={setTileLength}
                suffix="in"
                min={0}
              />
              <CalculatorInput
                label="Tile Width"
                value={tileWidth}
                onChange={setTileWidth}
                suffix="in"
                min={0}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Grout Width"
                value={groutWidth}
                onChange={setGroutWidth}
                suffix="in"
                step={0.0625}
                min={0}
                helpText='Standard is 1/8" (0.125)'
              />
              <CalculatorInput
                label="Waste Factor"
                value={wasteFactor}
                onChange={setWasteFactor}
                suffix="%"
                min={0}
                max={100}
                helpText="10% is standard"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Box className="w-5 h-5 text-blue-500" />
              Packaging & Cost
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Tiles per Box"
                value={tilesPerBox}
                onChange={setTilesPerBox}
                min={1}
              />
              <CalculatorInput
                label="Price per Tile"
                value={pricePerTile}
                onChange={setPricePerTile}
                prefix={currency.symbol}
                min={0}
                step={0.01}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <CalculatorResult
            label="Total Tiles Needed"
            value={tilesWithWaste}
            subValue="Tiles"
            description={`Including ${wasteFactor}% waste factor. Base amount: ${tilesNeeded} tiles.`}
            color="blue"
            icon={<Grid className="w-8 h-8 text-blue-600" />}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-100">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">Boxes Needed</p>
              <p className="text-3xl font-black text-green-700">{boxesNeeded}</p>
              <p className="text-xs text-green-600/70 mt-1">At {tilesPerBox} tiles/box</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100">
              <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">Total Area</p>
              <p className="text-3xl font-black text-purple-700">{roomAreaSqFt.toFixed(1)}</p>
              <p className="text-xs text-purple-600/70 mt-1">Square Feet</p>
            </div>
          </div>

          {totalCost > 0 && (
            <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-lg shadow-blue-200">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Estimated Material Cost</p>
              <p className="text-5xl font-black">{formatCurrency(totalCost)}</p>
              <p className="mt-4 text-sm opacity-80 leading-relaxed">
                Based on {tilesWithWaste} tiles at {formatCurrency(pricePerTile)} each.
              </p>
            </div>
          )}

          <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-100 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-bold mb-1">Pro Tip:</p>
              <p className="opacity-80">
                Always buy at least 10% more than you need for cuts, breakage, and future repairs. For diagonal patterns, increase waste to 15-20%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
