import { useEffect, useState, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useTheme } from "@/hooks/use-theme";
import { projects } from "@/components/projects-section";
import {
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Sun,
  Moon,
  Download,
} from "lucide-react";

const sections = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "contact", label: "Contact", icon: Mail },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);

    const openHandler = () => setOpen(true);
    window.addEventListener("open-command-palette", openHandler);

    return () => {
      document.removeEventListener("keydown", handler);
      window.removeEventListener("open-command-palette", openHandler);
    };
  }, []);

  const goTo = useCallback((id: string) => {
    setOpen(false);
    // Wait a tick for the dialog to close before scrolling
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const openLink = useCallback((url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const openProject = useCallback((id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.dispatchEvent(new CustomEvent("open-project-detail", { detail: { id } }));
    }, 50);
  }, []);

  return (
    <>
      {/* Small hint button, visible in the nav — see navigation.tsx */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to a section, or run a command…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {sections.map((s) => (
              <CommandItem key={s.id} onSelect={() => goTo(s.id)}>
                <s.icon className="mr-2 h-4 w-4" />
                <span>{s.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projects.map((project) => (
              <CommandItem key={project.id} onSelect={() => openProject(project.id)}>
                <FolderGit2 className="mr-2 h-4 w-4" />
                <span>{project.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => openLink("mailto:mukulsachdeva1997@gmail.com")}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Send me an email</span>
            </CommandItem>
            <CommandItem onSelect={() => openLink("https://github.com/mukulsachdeva1997")}>
              <Github className="mr-2 h-4 w-4" />
              <span>Open GitHub profile</span>
            </CommandItem>
            <CommandItem onSelect={() => openLink("https://www.linkedin.com/in/mukul-sachdeva1997")}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>Open LinkedIn profile</span>
            </CommandItem>
            <CommandItem onSelect={() => { toggleTheme(); setOpen(false); }}>
              {theme === "dark" ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              <span>Toggle {theme === "dark" ? "light" : "dark"} mode</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
