import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Type, 
  Users, 
  MessageSquare, 
  Save, 
  LogOut, 
  RotateCcw, 
  Plus, 
  Trash2,
  ChevronRight,
  BookOpen,
  Mic2,
  Download
} from 'lucide-react';

type Tab = 'hero' | 'mission' | 'story' | 'team' | 'testimonials';

export default function AdminDashboard() {
  const { content, updateContent, resetToDefaults } = useData();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // Local state for the form before saving
  const [formData, setFormData] = useState(content);
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    updateContent(formData);
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cadence_content.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- INPUT HELPERS ---
  const TextField = ({ label, value, onChange, multiline = false }: { label: string, value: string, onChange: (val: string) => void, multiline?: boolean }) => (
    <div className="mb-4">
      <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark/60 mb-1">{label}</label>
      {multiline ? (
        <textarea 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full p-3 rounded-lg border border-primary-dark/10 bg-white focus:ring-2 focus:ring-accent/50 outline-none min-h-[100px]"
        />
      ) : (
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full p-3 rounded-lg border border-primary-dark/10 bg-white focus:ring-2 focus:ring-accent/50 outline-none"
        />
      )}
    </div>
  );

  const SectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-primary-dark/10">
      <Icon size={20} className="text-accent" />
      <h2 className="font-heading text-xl font-bold text-primary-dark">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-primary-dark text-white flex-shrink-0 md:h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-heading text-xl font-bold tracking-wide">Cadence Admin</h1>
        </div>
        
        <nav className="p-4 space-y-1">
          {[
            { id: 'hero', label: 'Hero & Stats', icon: LayoutDashboard },
            { id: 'mission', label: 'Mission & Vision', icon: BookOpen },
            { id: 'story', label: 'Timeline Story', icon: RotateCcw },
            { id: 'team', label: 'Team Members', icon: Users },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id ? 'bg-accent text-white font-bold' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <button 
            onClick={() => window.open('/', '_blank')}
            className="w-full flex items-center gap-2 text-sm text-white/60 hover:text-white mb-4 px-2"
          >
            <ChevronRight size={14} /> View Live Site
          </button>
          
          <button 
            onClick={handleExport}
            className="w-full flex items-center gap-2 text-sm text-accent hover:text-white mb-4 px-2 font-bold"
          >
            <Download size={14} /> Export Config JSON
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-200 hover:bg-red-500/40 rounded-lg transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* HEADER ACTIONS */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-primary-dark capitalize">{activeTab} Editor</h2>
            <div className="flex gap-3">
              <button 
                onClick={resetToDefaults}
                className="px-4 py-2 text-sm text-primary-dark/60 hover:text-red-500 underline"
              >
                Reset Data
              </button>
              <button 
                onClick={handleSave}
                disabled={saveStatus !== 'idle'}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white transition-all shadow-lg ${
                  saveStatus === 'saved' ? 'bg-green-500' : 'bg-primary-dark hover:bg-accent'
                }`}
              >
                {saveStatus === 'saved' ? (
                  <>Saved!</>
                ) : (
                  <> <Save size={18} /> Save Changes </>
                )}
              </button>
            </div>
          </div>

          {/* TABS CONTENT */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-primary-dark/5">
            
            {/* HERO EDITOR */}
            {activeTab === 'hero' && (
              <div className="space-y-8">
                <div>
                  <SectionTitle title="Hero Text" icon={Type} />
                  <TextField 
                    label="Tagline (Small Top Text)" 
                    value={formData.hero.tagline} 
                    onChange={(v) => setFormData({...formData, hero: {...formData.hero, tagline: v}})} 
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField 
                      label="Title Line 1" 
                      value={formData.hero.titleLine1} 
                      onChange={(v) => setFormData({...formData, hero: {...formData.hero, titleLine1: v}})} 
                    />
                    <TextField 
                      label="Title Line 2 (Colored)" 
                      value={formData.hero.titleLine2} 
                      onChange={(v) => setFormData({...formData, hero: {...formData.hero, titleLine2: v}})} 
                    />
                  </div>
                  <TextField 
                    label="Subtitle" 
                    value={formData.hero.subtitle} 
                    multiline
                    onChange={(v) => setFormData({...formData, hero: {...formData.hero, subtitle: v}})} 
                  />
                </div>

                <div>
                  <SectionTitle title="Statistics" icon={Mic2} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formData.stats.map((stat, idx) => (
                      <div key={stat.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <TextField 
                          label={`Stat ${idx+1} Value`} 
                          value={stat.value} 
                          onChange={(v) => {
                            const newStats = [...formData.stats];
                            newStats[idx].value = v;
                            setFormData({...formData, stats: newStats});
                          }} 
                        />
                        <TextField 
                          label={`Stat ${idx+1} Label`} 
                          value={stat.label} 
                          onChange={(v) => {
                            const newStats = [...formData.stats];
                            newStats[idx].label = v;
                            setFormData({...formData, stats: newStats});
                          }} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MISSION EDITOR */}
            {activeTab === 'mission' && (
              <div className="space-y-8">
                <div>
                  <SectionTitle title="Mission Statement" icon={BookOpen} />
                  <TextField 
                    label="Mission Text" 
                    value={formData.mission.text} 
                    multiline
                    onChange={(v) => setFormData({...formData, mission: {...formData.mission, text: v}})} 
                  />
                  <TextField 
                    label="Sub-text" 
                    value={formData.mission.subText} 
                    multiline
                    onChange={(v) => setFormData({...formData, mission: {...formData.mission, subText: v}})} 
                  />
                </div>
                <div>
                  <SectionTitle title="Vision Statement" icon={BookOpen} />
                  <TextField 
                    label="Vision Text" 
                    value={formData.vision.text} 
                    multiline
                    onChange={(v) => setFormData({...formData, vision: {...formData.vision, text: v}})} 
                  />
                </div>
              </div>
            )}

             {/* TEAM EDITOR */}
             {activeTab === 'team' && (
              <div>
                <SectionTitle title="Team Members" icon={Users} />
                <div className="space-y-8">
                  {formData.team.map((member, idx) => (
                    <div key={member.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-primary-dark">{member.name || 'New Member'}</h3>
                        <button 
                          onClick={() => {
                             const newTeam = formData.team.filter((_, i) => i !== idx);
                             setFormData({...formData, team: newTeam});
                          }}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField label="Name" value={member.name} onChange={(v) => {
                          const newTeam = [...formData.team]; newTeam[idx].name = v; setFormData({...formData, team: newTeam});
                        }} />
                        <TextField label="Role" value={member.role} onChange={(v) => {
                          const newTeam = [...formData.team]; newTeam[idx].role = v; setFormData({...formData, team: newTeam});
                        }} />
                      </div>
                      
                      <TextField label="Image URL" value={member.image || ''} onChange={(v) => {
                          const newTeam = [...formData.team]; newTeam[idx].image = v; setFormData({...formData, team: newTeam});
                      }} />

                      <TextField label="Short Bio (Front of Card)" value={member.shortBio} multiline onChange={(v) => {
                          const newTeam = [...formData.team]; newTeam[idx].shortBio = v; setFormData({...formData, team: newTeam});
                      }} />
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-bold text-sm text-primary-dark mb-4 uppercase tracking-wide">Detailed Modal Info</h4>
                        
                        <TextField label="Full Bio" value={member.fullBio || ''} multiline onChange={(v) => {
                            const newTeam = [...formData.team]; newTeam[idx].fullBio = v; setFormData({...formData, team: newTeam});
                        }} />
                        
                        <TextField label="Why Started / Origin Story" value={member.whyStarted || ''} multiline onChange={(v) => {
                            const newTeam = [...formData.team]; newTeam[idx].whyStarted = v; setFormData({...formData, team: newTeam});
                        }} />

                        <TextField label="Personal Connection" value={member.personalConnection || ''} multiline onChange={(v) => {
                            const newTeam = [...formData.team]; newTeam[idx].personalConnection = v; setFormData({...formData, team: newTeam});
                        }} />

                         <TextField label="Role Focus" value={member.roleFocus || ''} multiline onChange={(v) => {
                            const newTeam = [...formData.team]; newTeam[idx].roleFocus = v; setFormData({...formData, team: newTeam});
                        }} />

                        <TextField label="Credentials (One per line)" value={member.credentials?.join('\n') || ''} multiline onChange={(v) => {
                            const newTeam = [...formData.team]; newTeam[idx].credentials = v.split('\n').filter(x => x.trim() !== ''); setFormData({...formData, team: newTeam});
                        }} />
                         
                         <TextField label="Featured In (One per line)" value={member.featuredIn?.join('\n') || ''} multiline onChange={(v) => {
                            const newTeam = [...formData.team]; newTeam[idx].featuredIn = v.split('\n').filter(x => x.trim() !== ''); setFormData({...formData, team: newTeam});
                        }} />
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    onClick={() => {
                      const newId = 'tm' + (formData.team.length + 1);
                      setFormData({
                        ...formData, 
                        team: [...formData.team, { id: newId, name: 'New Member', role: 'Role', shortBio: 'Bio...' }]
                      });
                    }}
                    className="w-full py-4 border-2 border-dashed border-primary-dark/20 rounded-xl flex items-center justify-center gap-2 text-primary-dark/60 hover:bg-primary-dark/5 hover:border-primary-dark/40 transition-all"
                  >
                    <Plus size={20} /> Add Team Member
                  </button>
                </div>
              </div>
            )}

            {/* STORY TIMELINE EDITOR */}
            {activeTab === 'story' && (
              <div>
                <SectionTitle title="Timeline Story" icon={RotateCcw} />
                <div className="space-y-6">
                  {formData.story.map((block, idx) => (
                    <div key={block.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="col-span-1">
                             <TextField label="Year/Time" value={block.year} onChange={(v) => {
                                const newStory = [...formData.story]; newStory[idx].year = v; setFormData({...formData, story: newStory});
                             }} />
                          </div>
                          <div className="col-span-2">
                             <TextField label="Title" value={block.title} onChange={(v) => {
                                const newStory = [...formData.story]; newStory[idx].title = v; setFormData({...formData, story: newStory});
                             }} />
                          </div>
                       </div>
                       <TextField label="Image URL" value={block.image} onChange={(v) => {
                          const newStory = [...formData.story]; newStory[idx].image = v; setFormData({...formData, story: newStory});
                       }} />
                       <TextField label="Paragraphs (One per line)" value={block.paragraphs.join('\n\n')} multiline onChange={(v) => {
                          const newStory = [...formData.story]; newStory[idx].paragraphs = v.split('\n\n').filter(x => x.trim() !== ''); setFormData({...formData, story: newStory});
                       }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIALS EDITOR */}
             {activeTab === 'testimonials' && (
              <div>
                <SectionTitle title="Testimonials" icon={MessageSquare} />
                <div className="space-y-4">
                  {formData.testimonials.map((t, idx) => (
                    <div key={t.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                      <button 
                          onClick={() => {
                             const newTest = formData.testimonials.filter((_, i) => i !== idx);
                             setFormData({...formData, testimonials: newTest});
                          }}
                          className="absolute top-4 right-4 text-red-300 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                         <TextField label="Author" value={t.author} onChange={(v) => {
                            const newTest = [...formData.testimonials]; newTest[idx].author = v; setFormData({...formData, testimonials: newTest});
                         }} />
                         <TextField label="Role/Year" value={t.role} onChange={(v) => {
                            const newTest = [...formData.testimonials]; newTest[idx].role = v; setFormData({...formData, testimonials: newTest});
                         }} />
                      </div>
                      <TextField label="Quote" value={t.quote} multiline onChange={(v) => {
                          const newTest = [...formData.testimonials]; newTest[idx].quote = v; setFormData({...formData, testimonials: newTest});
                       }} />
                    </div>
                  ))}
                   <button 
                    onClick={() => {
                      const newId = 't' + (formData.testimonials.length + 1);
                      setFormData({
                        ...formData, 
                        testimonials: [...formData.testimonials, { id: newId, quote: "New testimonial...", author: "Name", role: "Student" }]
                      });
                    }}
                    className="w-full py-4 border-2 border-dashed border-primary-dark/20 rounded-xl flex items-center justify-center gap-2 text-primary-dark/60 hover:bg-primary-dark/5 hover:border-primary-dark/40 transition-all"
                  >
                    <Plus size={20} /> Add Testimonial
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}