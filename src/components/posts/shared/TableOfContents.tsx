
import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  isSticky?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content, isSticky = true }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Extract headings from content (this is a simplified version)
    const headings = content.match(/#{1,6}\s+(.+)/g) || [];
    const items = headings.map((heading, index) => {
      const level = (heading.match(/#/g) || []).length;
      const title = heading.replace(/#{1,6}\s+/, '');
      const id = `heading-${index}`;
      return { id, title, level };
    });
    setTocItems(items);
  }, [content]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className={`${isSticky ? 'sticky top-8' : ''} mb-8`}>
      <Card>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center">
                  <List size={20} className="mr-2" />
                  Índice
                </div>
                <ChevronRight 
                  size={20} 
                  className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} 
                />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left py-2 px-3 rounded text-sm transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                    style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default TableOfContents;
