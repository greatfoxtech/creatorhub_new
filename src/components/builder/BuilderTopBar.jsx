import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronLeft, Undo, Redo, Save, Eye, Monitor, Tablet, Smartphone, SquarePen, Moon, Sun } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function BuilderTopBar({ saving = false, onSave = () => {}, deviceView = 'desktop', setDeviceView = () => {}, darkMode = false, setDarkMode = () => {} }) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-white/10 bg-[#121726] px-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="text-gray-400 hover:text-white">
          <Link to={createPageUrl('Dashboard')}>
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="w-8 h-8 bg-gradient-to-br from-[#4368D9] to-[#6E43D9] rounded-lg flex items-center justify-center">
          <SquarePen className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-semibold text-white">Profile Builder</h1>
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Undo</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Redo</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg bg-black/20 p-1">
          <DeviceButton icon={Monitor} current={deviceView} type="desktop" set={setDeviceView} />
          <DeviceButton icon={Tablet} current={deviceView} type="tablet" set={setDeviceView} />
          <DeviceButton icon={Smartphone} current={deviceView} type="mobile" set={setDeviceView} />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="text-gray-400 hover:text-white"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Toggle {darkMode ? 'Light' : 'Dark'} Mode</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          disabled={saving}
          className="border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
          {saving ? 'Saving...' : 'Save Draft'}
        </Button>
        <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-200">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>
    </div>
  );
}

const DeviceButton = ({ icon: Icon, current, type, set }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${current === type ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          onClick={() => set(type)}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent><p className="capitalize">{type}</p></TooltipContent>
    </Tooltip>
  </TooltipProvider>
);