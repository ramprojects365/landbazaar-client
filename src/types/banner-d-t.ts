

// Define the interface with 'tabLabel' as optional
export interface ITabContentProps {
    id: string;                
    tabLabel?: string;         
    isActive: boolean;        
    onSortChange: () => void; 
    toggleFilter: () => void; 
};
// Define the interface hero from props
export interface IHeroFormProps {
    onSortChange: () => void;
    toggleFilter: () => void;
};