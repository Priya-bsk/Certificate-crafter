import React, { useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import { StepProps, TemplateField } from '../../types';
import { ArrowLeft, Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Trash2 } from 'lucide-react';

const Step3LayoutDesign: React.FC<StepProps> = ({ data, onDataChange, onNext, onPrev }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  const tw = data.templateWidth ?? displaySize.width;
  const th = data.templateHeight ?? displaySize.height;
  const scaleX = displaySize.width > 0 && tw > 0 ? tw / displaySize.width : 1;
  const scaleY = displaySize.height > 0 && th > 0 ? th / displaySize.height : 1;

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      const readSize = () => {
        const w = img.offsetWidth;
        const h = img.offsetHeight;
        setDisplaySize({ width: w, height: h });
        const updates: Partial<{ templateWidth: number; templateHeight: number; layoutDisplayWidth: number; layoutDisplayHeight: number }> = {};
        if (data.template && (data.templateWidth == null || data.templateHeight == null)) {
          updates.templateWidth = img.naturalWidth;
          updates.templateHeight = img.naturalHeight;
        }
        updates.layoutDisplayWidth = w;
        updates.layoutDisplayHeight = h;
        onDataChange(updates);
      };
      requestAnimationFrame(readSize);
    },
    [data.template, data.templateWidth, data.templateHeight, onDataChange]
  );

  const handleFieldDrop = useCallback(
    (columnKey: string, e: React.DragEvent) => {
      if (displaySize.width <= 0 || displaySize.height <= 0 || tw <= 0 || th <= 0) return;
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const dispX = e.clientX - rect.left;
      const dispY = e.clientY - rect.top;
      const natX = Math.round(dispX * scaleX);
      const natY = Math.round(dispY * scaleY);
      const clampX = Math.max(0, Math.min(natX, tw - 50));
      const clampY = Math.max(20, Math.min(natY, th - 20));

      const newField: TemplateField = {
        id: `field_${Date.now()}`,
        columnKey,
        x: clampX,
        y: clampY,
        fontSize: 24,
        fontFamily: 'Arial',
        color: '#000000',
        isBold: false,
        isItalic: false,
        textAlign: 'center',
      };

      onDataChange({ fields: [...data.fields, newField] });
    },
    [data.fields, displaySize.width, displaySize.height, onDataChange, scaleX, scaleY, tw, th]
  );

  const handleFieldUpdate = (fieldId: string, updates: Partial<TemplateField>) => {
    const updatedFields = data.fields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    );
    onDataChange({ fields: updatedFields });
  };

  const handleDeleteField = () => {
    if (!selectedField) return;
    onDataChange({ fields: data.fields.filter((f) => f.id !== selectedField) });
    setSelectedField(null);
  };

  const handleFieldDrag = useCallback(
    (fieldId: string, dragData: { x: number; y: number }) => {
      const natX = Math.round(dragData.x * scaleX);
      const natY = Math.round(dragData.y * scaleY);
      const updatedFields = data.fields.map((f) =>
        f.id === fieldId ? { ...f, x: natX, y: natY } : f
      );
      onDataChange({ fields: updatedFields });
    },
    [scaleX, scaleY, data.fields, onDataChange]
  );

  const selectedFieldData = data.fields.find(f => f.id === selectedField);

  const displayPosition = (field: TemplateField) => ({
    x: displaySize.width > 0 && tw > 0 ? field.x * (displaySize.width / tw) : field.x,
    y: displaySize.height > 0 && th > 0 ? field.y * (displaySize.height / th) : field.y,
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Design Certificate Layout</h2>
        <p className="text-lg text-gray-600">
          Drag column names onto your template and customize their appearance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with columns */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Fields</h3>
            <div className="space-y-2">
              {data.columns.map((column) => (
                <div
                  key={column}
                  draggable
                  onDragStart={() => setDraggedColumn(column)}
                  className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-move hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Type className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">{column}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Field Properties Panel */}
          {selectedFieldData && (
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <input
                    type="number"
                    value={selectedFieldData.fontSize}
                    onChange={(e) => handleFieldUpdate(selectedField!, { fontSize: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="8"
                    max="72"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                  <select
                    value={selectedFieldData.fontFamily}
                    onChange={(e) => handleFieldUpdate(selectedField!, { fontFamily: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="color"
                    value={selectedFieldData.color}
                    onChange={(e) => handleFieldUpdate(selectedField!, { color: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleFieldUpdate(selectedField!, { isBold: !selectedFieldData.isBold })}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg border transition-colors ${
                      selectedFieldData.isBold
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleFieldUpdate(selectedField!, { isItalic: !selectedFieldData.isItalic })}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg border transition-colors ${
                      selectedFieldData.isItalic
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex space-x-1">
                  {(['left', 'center', 'right'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => handleFieldUpdate(selectedField!, { textAlign: align })}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg border transition-colors ${
                        selectedFieldData.textAlign === align
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {align === 'left' && <AlignLeft className="w-4 h-4" />}
                      {align === 'center' && <AlignCenter className="w-4 h-4" />}
                      {align === 'right' && <AlignRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleDeleteField}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-4 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete field
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Template Canvas */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Template</h3>
            
            <div
              className="relative inline-block max-w-full overflow-hidden rounded-lg"
              onDrop={(e) => {
                e.preventDefault();
                if (draggedColumn) {
                  handleFieldDrop(draggedColumn, e);
                  setDraggedColumn(null);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <img
                src={data.template!}
                alt="Certificate Template"
                className="block max-w-full h-auto shadow-lg"
                style={{ maxHeight: '600px' }}
                draggable={false}
                onLoad={handleImageLoad}
              />
              
              {/* Rendered Fields - positioned in display space, stored in natural space */}
              {displaySize.width > 0 &&
                displaySize.height > 0 &&
                data.fields.map((field) => {
                  const pos = displayPosition(field);
                  return (
                    <Draggable
                      key={field.id}
                      position={pos}
                      onDrag={(_e, dragData) => handleFieldDrag(field.id, dragData)}
                      bounds="parent"
                    >
                      <div
                        className={`absolute top-0 left-0 cursor-move select-none p-2 rounded border-2 transition-all z-10 ${
                          selectedField === field.id
                            ? 'border-blue-500 bg-blue-50/90'
                            : 'border-transparent hover:border-gray-300 bg-white/90 hover:bg-gray-50/90'
                        }`}
                        onClick={() => setSelectedField(field.id)}
                        style={{
                          fontSize: `${field.fontSize}px`,
                          fontFamily: field.fontFamily,
                          color: field.color,
                          fontWeight: field.isBold ? 'bold' : 'normal',
                          fontStyle: field.isItalic ? 'italic' : 'normal',
                          textAlign: field.textAlign,
                          minWidth: '60px',
                        }}
                      >
                        {data.recipients.length > 0
                          ? String(data.recipients[0][field.columnKey] || field.columnKey)
                          : field.columnKey}
                      </div>
                    </Draggable>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="flex items-center px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Template
        </button>

        {data.fields.length > 0 && (
          <button
            onClick={onNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Continue to Preview
          </button>
        )}
      </div>
    </div>
  );
};

export default Step3LayoutDesign;