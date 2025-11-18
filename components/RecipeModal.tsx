import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="text-lg text-text-secondary">Generando recetas deliciosas...</p>
    </div>
);

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, recipe, isLoading, error }) => {
  if (!isOpen) return null;

  // Simple Markdown to HTML conversion
  const formatRecipe = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold text-primary mt-6 mb-2">{line.substring(3)}</h2>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
           return <h3 key={index} className="text-xl font-semibold text-text-primary mt-4 mb-2">{line.substring(2, line.length - 2)}</h3>;
        }
        if (line.startsWith('* ')) {
          return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        }
        if (line.match(/^\d+\./)) {
           return <li key={index} className="ml-5 list-decimal">{line.substring(line.indexOf(' ') + 1)}</li>
        }
        return <p key={index} className="my-1">{line}</p>;
      })
      .reduce((acc, elem, index) => {
          // Fix: Group list items into <ul> elements without mutating React element props.
          if (elem.type === 'li') {
              const lastElement = acc.length > 0 ? acc[acc.length - 1] : null;
              if (lastElement && lastElement.type === 'ul') {
                  // Add to existing list. Use cloneElement to avoid mutation.
                  acc[acc.length-1] = React.cloneElement(
                      lastElement, 
                      {}, 
                      // FIX: Cast `lastElement.props` to `any` to safely access the `children` property.
                      // This resolves a TypeScript error where `props` was being inferred as `unknown`.
                      ...React.Children.toArray((lastElement.props as any).children), 
                      elem
                  );
              } else {
                  // Start a new list.
                  acc.push(<ul key={`ul-${index}`} className="space-y-1">{[elem]}</ul>);
              }
          } else {
              acc.push(elem);
          }
          return acc;
      // Fix: Use React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
      }, [] as React.ReactElement[]);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-text-primary">Sugerencias de Recetas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Cerrar modal">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center text-red-500">
              <p className="font-semibold">¡Oh no!</p>
              <p>{error}</p>
            </div>
          ) : (
            <div className="prose max-w-none">
                {formatRecipe(recipe)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;