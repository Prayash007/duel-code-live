import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { supabase } from '../integrations/supabase/client';
import { Challenge } from '../data/challenges';
import Layout from '@/components/Layout';

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Challenge>>({
    title: '',
    difficulty: 'Easy',
    description: '',
    tags: [],
    timeLimit: 15,
    testCases: [{ input: '', output: '' }]
  });
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Basic validation
      if (!formData.title || !formData.description || formData.testCases?.some(tc => !tc.input || !tc.output)) {
        throw new Error('All fields are required');
      }

      const { data, error: supabaseError } = await supabase
        .from('challenges')
        .insert([{
          ...formData,
          participants: 0, // Initial participants
          languageId: 71 // Default to Python
        }])
        .select();

      if (supabaseError) throw supabaseError;
      
      if (data) {
        navigate('/challenges');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create challenge');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTestCase = () => {
    setFormData(prev => ({
      ...prev,
      testCases: [...(prev.testCases || []), { input: '', output: '' }]
    }));
  };

  const updateTestCase = (index: number, field: 'input' | 'output', value: string) => {
    const newTestCases = [...(formData.testCases || [])];
    newTestCases[index][field] = value;
    setFormData(prev => ({ ...prev, testCases: newTestCases }));
  };

  const addTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag]
      }));
      setNewTag('');
    }
  };

  return (
    <Layout>
    <div className="container mx-auto px-4 py-12 max-w-4xl bg-white text-black rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-10 text-purple-600">Create New Challenge</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-sm font-semibold text-purple-700">Challenge Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="bg-gray-50 border border-purple-400 focus:ring-purple-500 text-black"
          />
        </div>

        {/* Difficulty */}
        <div>
          <Label className="text-sm font-semibold text-purple-700">Difficulty</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value as 'Easy' | 'Medium' | 'Hard' }))}
          >
            <SelectTrigger className="w-[180px] bg-gray-50 text-black border border-purple-400 focus:ring-purple-500">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black border border-purple-400">
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm font-semibold text-purple-700">Problem Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={6}
            className="bg-gray-50 border border-purple-400 focus:ring-purple-500 text-black"
          />
        </div>

        {/* Tags */}
        <div>
          <Label className="text-sm font-semibold text-purple-700">Tags</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add new tag"
              className="bg-gray-50 border border-purple-400 text-black max-w-[200px]"
            />
            <Button
              type="button"
              onClick={addTag}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Add Tag
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Time Limit */}
        <div>
          <Label htmlFor="timeLimit" className="text-sm font-semibold text-purple-700">Time Limit (minutes)</Label>
          <Input
            id="timeLimit"
            type="number"
            value={formData.timeLimit}
            onChange={(e) => setFormData(prev => ({ ...prev, timeLimit: Number(e.target.value) }))}
            className="bg-gray-50 border border-purple-400 focus:ring-purple-500 text-black w-[150px]"
          />
        </div>

        {/* Test Cases */}
        <div>
          <Label className="text-sm font-semibold text-purple-700">Test Cases</Label>
          <div className="space-y-4">
            {formData.testCases?.map((testCase, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <Label className="text-sm text-purple-600">Input</Label>
                  <Input
                    value={testCase.input}
                    onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                    className="bg-gray-50 border border-purple-400 text-black"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-sm text-purple-600">Expected Output</Label>
                  <Input
                    value={testCase.output}
                    onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                    className="bg-gray-50 border border-purple-400 text-black"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={addTestCase}
              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Add Test Case
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-600 font-medium">{error}</div>}

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/challenges')}
            className="border border-purple-400 text-purple-700 hover:bg-purple-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSubmitting ? 'Creating...' : 'Create Challenge'}
          </Button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default CreateChallenge;
