import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus, Edit2, Eye, Copy, Trash2, FileText, LayoutTemplate
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import PageTemplatesModal, { PAGE_TEMPLATES } from '@/components/builderv2/PageTemplates';
import PreviewModal from '@/components/builderv2/PreviewModal';

const STORAGE_KEY = 'builderv2-pages';

const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Guess which template a page was built from based on its elements
const guessTemplate = (canvasJson = []) => {
  const types = canvasJson.map(el => el.type);
  if (types.includes('Feed')) return 'Personal Profile';
  if (types.includes('PortfolioGrid')) return 'Portfolio';
  if (types.includes('HeroSection')) return 'Landing Page';
  if (types.includes('Stories') || types.includes('Reels')) return 'Social Profile';
  return 'Blank';
};

const templateColor = (name) => {
  const map = {
    'Personal Profile': 'bg-blue-500/20 text-blue-300',
    'Portfolio': 'bg-purple-500/20 text-purple-300',
    'Landing Page': 'bg-green-500/20 text-green-300',
    'Social Profile': 'bg-pink-500/20 text-pink-300',
    'Blank': 'bg-gray-500/20 text-gray-400',
  };
  return map[name] || map['Blank'];
};

export default function PagesPage() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [previewPage, setPreviewPage] = useState(null); // page object for preview
  const [deletePageId, setDeletePageId] = useState(null);

  // Load pages from localStorage on mount
  useEffect(() => {
    const data = loadData();
    if (data?.pages) {
      setPages(data.pages);
    }
  }, []);

  // Listen for storage changes (in case BuilderV2 is open in another tab)
  useEffect(() => {
    const onStorage = () => {
      const data = loadData();
      if (data?.pages) setPages(data.pages);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const persistPages = (newPages) => {
    const data = loadData() || {};
    data.pages = newPages;
    data.timestamp = Date.now();
    saveData(data);
    setPages(newPages);
  };

  // Open BuilderV2 with the chosen page active
  const handleEdit = (page) => {
    const data = loadData() || {};
    data.activePageId = page.id;
    saveData(data);
    navigate('/BuilderV2');
  };

  // Called when user picks a template from the modal
  const handleApplyTemplate = (template) => {
    const uid = () => `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const pageNumbers = pages
      .map(p => p.name.match(/^Page (\d+)$/))
      .filter(Boolean)
      .map(m => parseInt(m[1]));
    const nextNumber = pageNumbers.length > 0 ? Math.max(...pageNumbers) + 1 : pages.length + 1;

    const newPage = {
      id: `page-${Date.now()}`,
      name: template ? template.name : `Page ${nextNumber}`,
      slug: template ? template.id : `page-${nextNumber}`,
      canvasJson: template ? template.build() : [],
      created_date: Date.now(),
      updated_date: Date.now(),
    };

    const newPages = [...pages, newPage];
    persistPages(newPages);
  };

  const handleDuplicate = (page) => {
    const newPage = {
      ...page,
      id: `page-${Date.now()}`,
      name: `${page.name} (Copy)`,
      slug: `${page.slug}-copy-${Date.now()}`,
      updated_date: Date.now(),
    };
    persistPages([...pages, newPage]);
  };

  const handleDelete = (pageId) => {
    persistPages(pages.filter(p => p.id !== pageId));
    setDeletePageId(null);
  };

  const formatDate = (ts) => {
    if (!ts) return '—';
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Pages</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your profile pages and layouts</p>
          </div>
          <Button
            onClick={() => setTemplateModalOpen(true)}
            className="bg-[#4368D9] hover:bg-[#3a59b4] text-white gap-2 self-start sm:self-auto"
          >
            <Plus size={16} />
            Create New Page
          </Button>
        </div>

        {/* Page grid */}
        {pages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-[#1A1F2E] rounded-full flex items-center justify-center mb-4">
              <LayoutTemplate size={28} className="text-[#4368D9]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No pages yet</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Create your first page using one of our ready-made templates or start blank.
            </p>
            <Button
              onClick={() => setTemplateModalOpen(true)}
              className="bg-[#4368D9] hover:bg-[#3a59b4] text-white gap-2"
            >
              <Plus size={16} />
              Create New Page
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => {
              const tplName = guessTemplate(page.canvasJson);
              return (
                <div
                  key={page.id}
                  className="bg-[#121726] border border-gray-800 rounded-xl p-5 flex flex-col gap-4 hover:border-gray-600 transition-colors"
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 bg-[#1A1F2E] rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText size={16} className="text-[#4368D9]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white text-sm truncate">{page.name}</h3>
                        <p className="text-xs text-gray-500 truncate">/{page.slug}</p>
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`text-[10px] font-medium px-2 py-0.5 ${templateColor(tplName)}`}>
                      {tplName}
                    </Badge>
                    <span className="text-[11px] text-gray-500">
                      {page.canvasJson?.length ?? 0} element{page.canvasJson?.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-600">
                    Last edited: {formatDate(page.updated_date || page.created_date)}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap mt-auto pt-1 border-t border-gray-800">
                    <Button
                      size="sm"
                      className="flex-1 bg-[#4368D9] hover:bg-[#3a59b4] text-white gap-1.5 text-xs"
                      onClick={() => handleEdit(page)}
                    >
                      <Edit2 size={12} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent border-gray-700 text-gray-300 hover:bg-[#1A1F2E] hover:text-white gap-1.5 text-xs"
                      onClick={() => setPreviewPage(page)}
                    >
                      <Eye size={12} />
                      Preview
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-gray-500 hover:text-white hover:bg-[#1A1F2E]"
                      title="Duplicate"
                      onClick={() => handleDuplicate(page)}
                    >
                      <Copy size={13} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10"
                      title="Delete"
                      onClick={() => setDeletePageId(page.id)}
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Templates Modal */}
      <PageTemplatesModal
        open={templateModalOpen}
        onOpenChange={setTemplateModalOpen}
        onApplyTemplate={(tpl) => { handleApplyTemplate(tpl); setTemplateModalOpen(false); }}
      />

      {/* Preview Modal */}
      {previewPage && (
        <PreviewModal
          open={!!previewPage}
          onOpenChange={(open) => { if (!open) setPreviewPage(null); }}
          elements={previewPage.canvasJson || []}
        />
      )}

      {/* Delete Confirm */}
      <AlertDialog open={!!deletePageId} onOpenChange={(open) => { if (!open) setDeletePageId(null); }}>
        <AlertDialogContent className="bg-[#1A1F2E] border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This will permanently delete "{pages.find(p => p.id === deletePageId)?.name}". This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-gray-600 text-white hover:bg-[rgba(255,255,255,0.08)]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(deletePageId)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}