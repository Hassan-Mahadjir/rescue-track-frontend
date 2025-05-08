import { Card, CardContent } from "@/components/ui/card";
import DeleteTagDialog from "./edit report/DeleteTagDialog";
import { useAuth } from "@/hooks/useAuth";

interface TagItem {
  id: number;
  name: string;
}

interface TagListProps {
  tags: TagItem[];
  type: "allergy" | "condition";
}

const TagList = ({ tags, type }: TagListProps) => {
  const { isAdmin } = useAuth();
  if (!tags || tags.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-muted-foreground text-sm">
        No {type} listed
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {tags.map((tag) => (
        <Card
          key={tag.id}
          className="p-1 border border-gray-200 shadow-sm bg-white"
        >
          <CardContent className="p-2 flex justify-between items-center text-xs text-gray-800">
            <span className="truncate capitalize font-semibold">
              {tag.name}
            </span>
            {isAdmin() ? <DeleteTagDialog id={tag.id} type={type} /> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TagList;
