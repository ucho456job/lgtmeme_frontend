-- Create storage policies
CREATE POLICY "SELECT images" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'images' AND auth.role() = 'anon');
CREATE POLICY "INSERT images" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'images' AND auth.role() = 'anon');
CREATE POLICY "DELETE images" ON storage.objects FOR DELETE TO anon USING (bucket_id = 'images' AND auth.role() = 'anon');
