
import React, { useState } from 'react';
import { AlertCircle, Info, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Message Shortcode
interface MessageProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  children: React.ReactNode;
}

export const Message: React.FC<MessageProps> = ({ type = 'info', children }) => {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle,
  };

  const colors = {
    info: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
    warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
    error: 'border-red-500 bg-red-50 dark:bg-red-950',
    success: 'border-green-500 bg-green-50 dark:bg-green-950',
  };

  const Icon = icons[type];

  return (
    <Alert className={`my-4 ${colors[type]}`}>
      <Icon className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

// Spoiler Shortcode
interface SpoilerProps {
  title?: string;
  children: React.ReactNode;
}

export const Spoiler: React.FC<SpoilerProps> = ({ title = 'Clique para revelar', children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="my-4 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <Button
        onClick={() => setIsVisible(!isVisible)}
        variant="ghost"
        className="w-full justify-between p-4 h-auto"
      >
        <span className="flex items-center">
          {isVisible ? <EyeOff size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
          {title}
        </span>
      </Button>
      {isVisible && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

// Button Shortcode
interface ButtonShortcodeProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  href?: string;
  children: React.ReactNode;
}

export const ButtonShortcode: React.FC<ButtonShortcodeProps> = ({ 
  variant = 'default', 
  size = 'default', 
  href, 
  children 
}) => {
  if (href) {
    return (
      <Button asChild variant={variant} size={size} className="my-2">
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} className="my-2">
      {children}
    </Button>
  );
};

// Tabs Shortcode
interface TabsShortcodeProps {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
  defaultValue?: string;
}

export const TabsShortcode: React.FC<TabsShortcodeProps> = ({ tabs, defaultValue }) => {
  const defaultTab = defaultValue || tabs[0]?.label.toLowerCase().replace(/\s+/g, '-');

  return (
    <Tabs defaultValue={defaultTab} className="my-6">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tabs.map((tab, index) => (
          <TabsTrigger 
            key={index} 
            value={tab.label.toLowerCase().replace(/\s+/g, '-')}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent 
          key={index} 
          value={tab.label.toLowerCase().replace(/\s+/g, '-')}
          className="mt-4"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

// Table Shortcode
interface TableShortcodeProps {
  headers: string[];
  rows: string[][];
}

export const TableShortcode: React.FC<TableShortcodeProps> = ({ headers, rows }) => {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {headers.map((header, index) => (
              <th 
                key={index} 
                className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50 dark:even:bg-gray-900">
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className="border border-gray-300 dark:border-gray-700 px-4 py-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Accordion Shortcode
interface AccordionShortcodeProps {
  items: Array<{
    title: string;
    content: React.ReactNode;
  }>;
}

export const AccordionShortcode: React.FC<AccordionShortcodeProps> = ({ items }) => {
  return (
    <Accordion type="multiple" className="my-6">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
